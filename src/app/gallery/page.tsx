'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Sparkles } from 'lucide-react'
import Gallery from '@/components/Gallery'

export default function GalleryPage() {
  return (
    <main className="min-h-screen px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* 头部 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-white/50 hover:text-neon-green transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            返回首页
          </Link>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-neon-green" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-neon-blue">
              图片集
            </span>
          </h1>
          <p className="text-white/60">记录每一个值得珍藏的瞬间</p>
        </motion.div>

        {/* 图片瀑布流 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <Gallery />
        </motion.div>
      </div>
    </main>
  )
}
