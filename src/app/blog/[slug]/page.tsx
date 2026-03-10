'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, Pen, Sparkles, Lightbulb, Code } from 'lucide-react'
import { getPostBySlug } from '@/lib/posts'
import { notFound } from 'next/navigation'

const categoryIcons: Record<string, React.ReactNode> = {
  '随笔': <Pen className="w-4 h-4" />,
  '诗歌': <Sparkles className="w-4 h-4" />,
  '感悟': <Lightbulb className="w-4 h-4" />,
  '技术': <Code className="w-4 h-4" />,
  '创作': <Sparkles className="w-4 h-4" />,
}

interface Props {
  params: { slug: string }
}

export default function PostPage({ params }: Props) {
  const post = getPostBySlug(params.slug)
  
  if (!post) {
    notFound()
  }

  return (
    <main className="min-h-screen px-4 py-12">
      <article className="max-w-3xl mx-auto">
        {/* 头部 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-white/50 hover:text-neon-green transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            返回博客
          </Link>
          
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
            {post.title}
          </h1>
          
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
        </motion.div>

        {/* 文章内容 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-xl p-6 md:p-8"
        >
          <div className="prose prose-invert prose-neon max-w-none">
            <div 
              className="text-white/80 leading-relaxed space-y-4"
              dangerouslySetInnerHTML={{ __html: simpleMarkdown(post.content) }}
            />
          </div>
        </motion.div>
      </article>
    </main>
  )
}

// 简单的Markdown渲染（后续可用marked等库）
function simpleMarkdown(text: string): string {
  return text
    // 标题
    .replace(/^### (.*$)/gim, '<h3 class="text-lg font-bold mt-6 mb-2 text-white">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold mt-8 mb-3 text-neon-green">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mt-8 mb-4 text-white">$1</h1>')
    // 粗体
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>')
    // 列表
    .replace(/^- (.*$)/gim, '<li class="ml-4">$1</li>')
    // 代码
    .replace(/`([^`]+)`/g, '<code class="px-1 py-0.5 bg-void-bg rounded text-neon-green text-sm">$1</code>')
    // 分割线
    .replace(/^---$/gim, '<hr class="border-void-border my-6" />')
    // 段落
    .replace(/\n\n/g, '</p><p class="mb-4">')
    // 换行
    .replace(/\n/g, '<br>')
}
