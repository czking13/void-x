'use client'

import { ArrowLeft, Calendar, Clock, Pen, Sparkles, Lightbulb, Filter, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { useState, useMemo } from 'react'
import { getAllPosts } from '@/lib/posts'

const categoryIcons: Record<string, React.ReactNode> = {
  '随笔': <Pen className="w-4 h-4" />,
  '诗歌': <Sparkles className="w-4 h-4" />,
  '感悟': <Lightbulb className="w-4 h-4" />,
}

// 标签筛选仅包含类型分类
const allTags = ['全部', '随笔', '诗歌', '感悟']

// 生成年份选项
const getYearOptions = (posts: ReturnType<typeof getAllPosts>) => {
  const years = new Set<string>()
  posts.forEach(post => {
    const year = post.date.split('-')[0]
    years.add(year)
  })
  return ['全部', ...Array.from(years).sort((a, b) => b.localeCompare(a))]
}

// 生成月份选项
const getMonthOptions = (posts: ReturnType<typeof getAllPosts>, selectedYear: string) => {
  const months = new Set<string>()
  posts.forEach(post => {
    const [year, month] = post.date.split('-')
    if (selectedYear === '全部' || year === selectedYear) {
      months.add(month)
    }
  })
  return ['全部', ...Array.from(months).sort()]
}

export default function BlogPage() {
  const posts = getAllPosts()
  const [selectedTag, setSelectedTag] = useState('全部')
  const [selectedYear, setSelectedYear] = useState('全部')
  const [selectedMonth, setSelectedMonth] = useState('全部')
  const [showYearDropdown, setShowYearDropdown] = useState(false)
  const [showMonthDropdown, setShowMonthDropdown] = useState(false)

  const yearOptions = useMemo(() => getYearOptions(posts), [posts])
  const monthOptions = useMemo(() => getMonthOptions(posts, selectedYear), [posts, selectedYear])

  // 根据标签和日期筛选文章
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      // 标签筛选（仅按类型分类）
      const tagMatch = selectedTag === '全部' || post.category === selectedTag
      
      // 日期筛选
      const [year, month] = post.date.split('-')
      const yearMatch = selectedYear === '全部' || year === selectedYear
      const monthMatch = selectedMonth === '全部' || month === selectedMonth
      
      return tagMatch && yearMatch && monthMatch
    })
  }, [posts, selectedTag, selectedYear, selectedMonth])

  return (
    <div className="min-h-screen bg-void-bg text-white">
      {/* 背景装饰 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-green/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-blue/5 rounded-full blur-3xl" />
      </div>

      <main className="relative z-10 max-w-4xl mx-auto px-4 py-12">
        {/* 返回首页 */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/50 hover:text-neon-green transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          返回首页
        </Link>

        {/* 标题 */}
        <h1 className="font-display text-4xl font-bold mb-2">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-neon-blue">
            博客
          </span>
        </h1>
        <p className="text-white/50 mb-8">随笔、诗歌、感悟与技术</p>

        {/* 筛选器 */}
        <div className="space-y-4 mb-8">
          {/* 标签筛选器 - 仅类型分类 */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <Filter className="w-4 h-4 text-white/50 flex-shrink-0" />
            <div className="flex gap-2">
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${
                    selectedTag === tag
                      ? 'bg-neon-green/20 text-neon-green border border-neon-green/50'
                      : 'bg-void-bg-card text-white/50 border border-white/10 hover:border-white/30'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* 日期筛选器 */}
          <div className="flex items-center gap-4">
            {/* 年份选择 */}
            <div className="relative">
              <button
                onClick={() => { setShowYearDropdown(!showYearDropdown); setShowMonthDropdown(false); }}
                className="flex items-center gap-2 px-3 py-1.5 bg-void-bg-card border border-white/10 rounded-lg text-sm text-white/70 hover:border-white/30 transition-colors"
              >
                <Calendar className="w-4 h-4" />
                {selectedYear === '全部' ? '全部年份' : `${selectedYear}年`}
                <ChevronDown className="w-4 h-4" />
              </button>
              {showYearDropdown && (
                <div className="absolute top-full left-0 mt-1 bg-void-bg-card border border-white/10 rounded-lg shadow-lg z-10 min-w-[120px]">
                  {yearOptions.map(year => (
                    <button
                      key={year}
                      onClick={() => { setSelectedYear(year); setShowYearDropdown(false); }}
                      className={`w-full px-4 py-2 text-left text-sm hover:bg-white/5 ${
                        selectedYear === year ? 'text-neon-green' : 'text-white/70'
                      }`}
                    >
                      {year === '全部' ? '全部年份' : `${year}年`}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 月份选择 */}
            <div className="relative">
              <button
                onClick={() => { setShowMonthDropdown(!showMonthDropdown); setShowYearDropdown(false); }}
                className="flex items-center gap-2 px-3 py-1.5 bg-void-bg-card border border-white/10 rounded-lg text-sm text-white/70 hover:border-white/30 transition-colors"
              >
                <Calendar className="w-4 h-4" />
                {selectedMonth === '全部' ? '全部月份' : `${parseInt(selectedMonth)}月`}
                <ChevronDown className="w-4 h-4" />
              </button>
              {showMonthDropdown && (
                <div className="absolute top-full left-0 mt-1 bg-void-bg-card border border-white/10 rounded-lg shadow-lg z-10 min-w-[120px] max-h-48 overflow-y-auto">
                  {monthOptions.map(month => (
                    <button
                      key={month}
                      onClick={() => { setSelectedMonth(month); setShowMonthDropdown(false); }}
                      className={`w-full px-4 py-2 text-left text-sm hover:bg-white/5 ${
                        selectedMonth === month ? 'text-neon-green' : 'text-white/70'
                      }`}
                    >
                      {month === '全部' ? '全部月份' : `${parseInt(month)}月`}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 重置筛选 */}
            {(selectedYear !== '全部' || selectedMonth !== '全部' || selectedTag !== '全部') && (
              <button
                onClick={() => { setSelectedYear('全部'); setSelectedMonth('全部'); setSelectedTag('全部'); }}
                className="text-neon-green hover:underline text-sm"
              >
                重置筛选
              </button>
            )}
          </div>
        </div>

        {/* 文章列表 */}
        <div className="space-y-6 mb-16">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12 text-white/50">
              没有找到相关文章
            </div>
          ) : (
            filteredPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block glass rounded-xl p-6 hover:border-neon-green/30 transition-all group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h2 className="font-display text-xl font-bold mb-2 group-hover:text-neon-green transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-white/60 text-sm mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    
                    {/* 元信息 */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-white/40">
                      <span className="flex items-center gap-1 text-neon-green">
                        {categoryIcons[post.category] || <Pen className="w-4 h-4" />}
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.readingTime}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>

        {/* 提示 */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-12 text-white/50">
            没有找到相关文章
          </div>
        )}
      </main>
    </div>
  )
}
