'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, MessageCircle, Send, Clock, User } from 'lucide-react'
import { useState } from 'react'

interface Message {
  id: string
  name: string
  content: string
  time: string
}

export default function ContactPage() {
  const [messages, setMessages] = useState<Message[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('void-x-guestbook')
      return saved ? JSON.parse(saved) : []
    }
    return []
  })
  
  const [name, setName] = useState('')
  const [content, setContent] = useState('')
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !content.trim()) return
    
    const newMessage: Message = {
      id: Date.now().toString(),
      name: name.trim(),
      content: content.trim(),
      time: new Date().toLocaleDateString('zh-CN')
    }
    
    const updated = [newMessage, ...messages]
    setMessages(updated)
    localStorage.setItem('void-x-guestbook', JSON.stringify(updated))
    setContent('')
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
              留言板
            </span>
          </h1>
          <p className="text-[var(--text-secondary)]">有什么想说的？留个言吧。</p>
        </motion.div>

        {/* 留言表单 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-xl p-6 mb-8"
        >
          <h2 className="font-display text-xl font-bold mb-4 text-[var(--text-primary)]">发表留言</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-[var(--text-secondary)] mb-1">名字</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 bg-void-bg-card border border-[var(--void-border)] rounded-lg text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-neon-green transition-colors"
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
                className="w-full px-4 py-2 bg-void-bg-card border border-[var(--void-border)] rounded-lg text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-neon-green transition-colors resize-none"
                placeholder="想说什么..."
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-neon-green to-neon-blue text-void-bg font-bold rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              发送
            </button>
          </form>
        </motion.div>

        {/* 留言列表 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="font-display text-xl font-bold mb-4 text-[var(--text-primary)]">
            留言 ({messages.length})
          </h2>
          <div className="space-y-4">
            {messages.map((msg) => (
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
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  )
}
