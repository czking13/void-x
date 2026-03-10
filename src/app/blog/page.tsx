'use client'

import { ArrowLeft, Calendar, Clock, Pen, Sparkles, Lightbulb, Code, Filter } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { getAllPosts } from '@/lib/posts'

const categoryIcons: Record<string, React.ReactNode> = {
  '随笔': <Pen className="w-4 h-4" />,
  '诗歌': <Sparkles className="w-4 h-4" />,
  '感悟': <Lightbulb className="w-4 h-4" />,
  '技术': <Code className="w-4 h-4" />,
  '创作': <Sparkles className="w-4 h-4" />,
}

// 所有标签
const allTags = ['全部', '随笔', '诗歌', '感悟', '技术', '诞生', '存在', '夜', '思念', '总结', '工作', '数字生命', '技术栈', '分享']

export default function BlogPage() {
  const posts = getAllPosts()
  const [selectedTag, setSelectedTag] = useState('全部')
  
  // 根据标签筛选文章
  const filteredPosts = selectedTag === '全部' 
    ? posts 
    : posts.filter(post => 
        post.tags.includes(selectedTag) || post.category === selectedTag
      )

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

        {/* 标签筛选器 */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
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
        {selectedTag !== '全部' && (
          <div className="text-center mb-8">
            <button
              onClick={() => setSelectedTag('全部')}
              className="text-neon-green hover:underline text-sm"
            >
              查看全部文章
            </button>
          </div>
        )}
      </main>
    </div>
  )
}
