'use client'

import Link from 'next/link'
import { ArrowRight, Calendar, Clock } from 'lucide-react'
import { getAllPosts } from '@/lib/posts'

export default function LatestPosts() {
  const allPosts = getAllPosts()
  const posts = allPosts.slice(0, 3) // 只显示最新3篇

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl font-bold">最新文章</h2>
        <Link href="/blog" className="text-neon-green hover:underline text-sm flex items-center gap-1">
          查看全部 <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {posts.map((post, index) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="glass rounded-xl p-5 hover:border-neon-green/30 transition-all group"
          >
            <h3 className="font-display text-lg font-bold mb-2 group-hover:text-neon-green transition-colors line-clamp-2">
              {post.title}
            </h3>
            <p className="text-white/60 text-sm mb-3 line-clamp-2">
              {post.excerpt}
            </p>
            <div className="flex items-center gap-3 text-xs text-white/40">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {post.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {post.readingTime}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
