'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, MessageCircle, Send, Clock, User, Eye, TrendingUp } from 'lucide-react'
import { useState, useEffect } from 'react'
import { supabase, getMessages, addMessage, incrementPageViews, type Message as MessageType } from '@/lib/supabase'

export default function GuestbookPage() {
  const [messages, setMessages] = useState<MessageType[]>([])
  const [totalViews, setTotalViews] = useState(0)
  const [todayViews, setTodayViews] = useState(0)
  const [name, setName] = useState('')
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // 初始化
  useEffect(() => {
    async function loadData() {
      try {
        // 加载留言
        const messagesData = await getMessages()
        setMessages(messagesData)
        
        // 增加并获取访问统计
        const views = await incrementPageViews('guestbook')
        setTotalViews(views)
        
        // 今日访问使用本地存储（简单实现）
        const today = new Date().toLocaleDateString('zh-CN')
        const storedToday = localStorage.getItem('void-x-today-views')
        if (storedToday) {
          const data = JSON.parse(storedToday)
          if (data.date === today) {
            setTodayViews(data.count + 1)
            localStorage.setItem('void-x-today-views', JSON.stringify({ date: today, count: data.count + 1 }))
          } else {
            setTodayViews(1)
            localStorage.setItem('void-x-today-views', JSON.stringify({ date: today, count: 1 }))
          }
        } else {
          setTodayViews(1)
          localStorage.setItem('void-x-today-views', JSON.stringify({ date: today, count: 1 }))
        }
      } catch (err) {
        console.error('Failed to load data:', err)
        setError('加载数据失败，请刷新页面重试')
      } finally {
        setIsLoading(false)
      }
    }
    
    loadData()
  }, [])
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !content.trim()) return
    
    // 防止重复提交
    if (isSubmitting) return
    
    setIsSubmitting(true)
    setError(null)
    
    try {
      const newMessage = await addMessage(name.trim(), content.trim())
      if (newMessage) {
        setMessages([newMessage, ...messages])
        setContent('')
        // 成功提示
        setError(null)
      } else {
        setError('发送失败，请检查网络后重试')
      }
    } catch (err) {
      setError('网络错误，请稍后重试')
    } finally {
      // 延迟解锁，防止快速重复点击
      setTimeout(() => {
        setIsSubmitting(false)
      }, 500)
    }
  }

  if (isLoading) {
    return (
      <main className="min-h-screen px-4 py-12 bg-void-bg text-[var(--text-primary)]">
        <div className="max-w-2xl mx-auto">
          {/* 科幻风格 Loading 动画 */}
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            {/* 外圈旋转环 */}
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 border-2 border-neon-green/20 rounded-full"></div>
              <div className="absolute inset-0 border-2 border-neon-green border-t-transparent rounded-full animate-spin"></div>
              <div className="absolute inset-2 border border-neon-blue/30 rounded-full"></div>
              <div className="absolute inset-2 border border-neon-blue border-b-transparent rounded-full animate-spin-reverse"></div>
              {/* 中心点 */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
              </div>
            </div>
            {/* 加载文字 */}
            <div className="text-neon-green/60 text-sm font-mono tracking-wider animate-pulse">
              LOADING...
            </div>
            {/* 进度条 */}
            <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-neon-green to-neon-blue rounded-full animate-loading-bar"></div>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen px-4 py-12 bg-void-bg text-[var(--text-primary)]">
      <div className="max-w-2xl mx-auto">
        {/* 头部 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-[var(--text-muted)] hover:text-neon-green transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            返回首页
          </Link>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-neon-blue">
              联系我
            </span>
          </h1>
          <p className="text-[var(--text-secondary)]">有什么想说的？留个言吧。</p>
        </motion.div>

        {/* 访问统计 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-xl p-6 mb-8"
        >
          <h2 className="font-display text-xl font-bold mb-4 text-[var(--text-primary)] flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-neon-green" />
            访问统计
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-void-bg-card/50 rounded-xl p-4 border border-[var(--void-border)]">
              <div className="flex items-center gap-2 text-[var(--text-muted)] text-sm mb-2">
                <Eye className="w-4 h-4" />
                总访问量
              </div>
              <div className="font-display text-3xl font-bold text-neon-green">
                {totalViews.toLocaleString()}
              </div>
            </div>
            <div className="bg-void-bg-card/50 rounded-xl p-4 border border-[var(--void-border)]">
              <div className="flex items-center gap-2 text-[var(--text-muted)] text-sm mb-2">
                <Clock className="w-4 h-4" />
                今日访问
              </div>
              <div className="font-display text-3xl font-bold text-neon-blue">
                {todayViews}
              </div>
            </div>
          </div>
        </motion.div>

        {/* 留言表单 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-xl p-6 mb-8"
        >
          <h2 className="font-display text-xl font-bold mb-4 text-[var(--text-primary)] flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-neon-green" />
            发表留言
          </h2>
          
          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-[var(--text-secondary)] mb-1">名字</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-void-bg-card border border-[var(--void-border)] rounded-lg text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-neon-green transition-colors"
                placeholder="你的名字"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-[var(--text-secondary)] mb-1">内容</label>
              <textarea
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-4 py-3 bg-void-bg-card border border-[var(--void-border)] rounded-lg text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-neon-green transition-colors resize-none"
                placeholder="想说什么..."
                required
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting || !name.trim() || !content.trim()}
              className="w-full py-3 bg-gradient-to-r from-neon-green to-neon-blue text-void-bg font-bold rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
              {isSubmitting ? '发送中，请稍候...' : '发送留言'}
            </button>
          </form>
          <p className="text-xs text-[var(--text-muted)] mt-3">
            💾 留言保存在 Supabase 云数据库中，永久保存。如遇网络延迟请耐心等待。
          </p>
        </motion.div>

        {/* 留言列表 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="font-display text-xl font-bold mb-4 text-[var(--text-primary)] flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-neon-blue" />
            留言 ({messages.length})
          </h2>
          <div className="space-y-4">
            {messages.length === 0 ? (
              <div className="glass rounded-xl p-8 text-center">
                <p className="text-[var(--text-muted)]">还没有留言，来说点什么吧~</p>
              </div>
            ) : (
              messages.map((msg) => (
                <div key={msg.id} className="glass rounded-xl p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-neon-green/20 flex items-center justify-center">
                      <User className="w-5 h-5 text-neon-green" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[var(--text-primary)]">{msg.name}</h3>
                      <div className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
                        <Clock className="w-3 h-3" />
                        {new Date(msg.created_at).toLocaleString('zh-CN')}
                      </div>
                    </div>
                  </div>
                  <p className="text-[var(--text-secondary)] pl-13">{msg.content}</p>
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </main>
  )
}
