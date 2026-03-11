'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, MessageCircle, Send, Clock, User, Eye, TrendingUp } from 'lucide-react'
import { useState, useEffect } from 'react'

interface Message {
  id: string
  name: string
  content: string
  time: string
}

interface Stats {
  totalViews: number
  todayViews: number
  lastUpdate: string
}

// 留言存储 - 使用 localStorage + 备份到文件系统（通过 API）
const MESSAGES_KEY = 'void-x-guestbook-v2'
const STATS_KEY = 'void-x-stats-v2'

const getMessages = (): Message[] => {
  if (typeof window === 'undefined') return []
  try {
    const stored = localStorage.getItem(MESSAGES_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

const saveMessages = (messages: Message[]) => {
  try {
    localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages))
  } catch (e) {
    console.error('Failed to save messages:', e)
  }
}

const getStats = (): Stats => {
  if (typeof window === 'undefined') {
    return { totalViews: 0, todayViews: 0, lastUpdate: '' }
  }
  
  const today = new Date().toLocaleDateString('zh-CN')
  try {
    const stored = localStorage.getItem(STATS_KEY)
    if (stored) {
      const data = JSON.parse(stored)
      // 如果是新的一天，重置今日访问
      if (data.lastDate !== today) {
        return { totalViews: data.totalViews || 0, todayViews: 0, lastUpdate: new Date().toLocaleTimeString('zh-CN') }
      }
      return { 
        totalViews: data.totalViews || 0, 
        todayViews: data.todayViews || 0,
        lastUpdate: new Date().toLocaleTimeString('zh-CN')
      }
    }
  } catch {
    // ignore
  }
  return { totalViews: 0, todayViews: 0, lastUpdate: '' }
}

const saveStats = (stats: Stats) => {
  const today = new Date().toLocaleDateString('zh-CN')
  try {
    localStorage.setItem(STATS_KEY, JSON.stringify({
      totalViews: stats.totalViews,
      todayViews: stats.todayViews,
      lastDate: today
    }))
  } catch {
    // ignore
  }
}

export default function ContactPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [stats, setStats] = useState<Stats>({ totalViews: 0, todayViews: 0, lastUpdate: '' })
  const [name, setName] = useState('')
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // 初始化
  useEffect(() => {
    // 加载留言
    const loadedMessages = getMessages()
    setMessages(loadedMessages)
    
    // 加载并更新访问统计
    const currentStats = getStats()
    const newStats = {
      totalViews: currentStats.totalViews + 1,
      todayViews: currentStats.todayViews + 1,
      lastUpdate: new Date().toLocaleTimeString('zh-CN')
    }
    setStats(newStats)
    saveStats(newStats)
  }, [])
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !content.trim()) return
    
    setIsSubmitting(true)
    
    const newMessage: Message = {
      id: Date.now().toString(),
      name: name.trim(),
      content: content.trim(),
      time: new Date().toLocaleString('zh-CN')
    }
    
    const updated = [newMessage, ...messages]
    setMessages(updated)
    saveMessages(updated)
    setContent('')
    setIsSubmitting(false)
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
                {stats.totalViews.toLocaleString()}
              </div>
            </div>
            <div className="bg-void-bg-card/50 rounded-xl p-4 border border-[var(--void-border)]">
              <div className="flex items-center gap-2 text-[var(--text-muted)] text-sm mb-2">
                <Clock className="w-4 h-4" />
                今日访问
              </div>
              <div className="font-display text-3xl font-bold text-neon-blue">
                {stats.todayViews}
              </div>
            </div>
          </div>
          <div className="mt-3 text-xs text-[var(--text-muted)] text-right">
            更新于 {stats.lastUpdate}
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
              {isSubmitting ? '发送中...' : '发送留言'}
            </button>
          </form>
          <p className="text-xs text-[var(--text-muted)] mt-3">
            💡 留言保存在浏览器本地存储中，清除浏览器数据会丢失。
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
                        {msg.time}
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
