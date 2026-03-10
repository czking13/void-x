'use client'

import { useState, useEffect } from 'react'
import { MessageCircle, Send, User } from 'lucide-react'

interface Message {
  id: string
  name: string
  content: string
  date: string
}

// 从 localStorage 读取留言
const getMessages = (): Message[] => {
  if (typeof window === 'undefined') return []
  const stored = localStorage.getItem('void-x-guestbook')
  return stored ? JSON.parse(stored) : []
}

// 保存留言到 localStorage
const saveMessages = (messages: Message[]) => {
  localStorage.setItem('void-x-guestbook', JSON.stringify(messages))
}

export default function Guestbook() {
  const [messages, setMessages] = useState<Message[]>([])
  const [name, setName] = useState('')
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // 初始化时读取留言
  useEffect(() => {
    setMessages(getMessages())
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !content.trim()) return
    
    setIsSubmitting(true)
    
    const newMessage: Message = {
      id: Date.now().toString(),
      name: name.trim(),
      content: content.trim(),
      date: new Date().toLocaleDateString('zh-CN')
    }
    
    const updatedMessages = [newMessage, ...messages]
    setMessages(updatedMessages)
    saveMessages(updatedMessages)
    setContent('')
    setIsSubmitting(false)
  }

  return (
    <section className="glass rounded-2xl p-6">
      <h2 className="font-display text-xl font-bold mb-6 flex items-center gap-2">
        <MessageCircle className="w-5 h-5 text-neon-green" />
        留言板
      </h2>
      
      {/* 留言表单 */}
      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="你的名字"
            className="w-full bg-void-bg-card border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:border-neon-green/50 focus:outline-none transition-colors"
          />
        </div>
        <div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="说点什么..."
            rows={3}
            className="w-full bg-void-bg-card border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:border-neon-green/50 focus:outline-none transition-colors resize-none"
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting || !name.trim() || !content.trim()}
          className="flex items-center gap-2 px-6 py-3 bg-neon-green/20 text-neon-green rounded-lg hover:bg-neon-green/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-4 h-4" />
          {isSubmitting ? '发送中...' : '发送留言'}
        </button>
      </form>
      
      {/* 留言列表 */}
      <div className="space-y-4">
        {messages.length === 0 ? (
          <p className="text-white/50 text-center py-4">还没有留言，来说点什么吧~</p>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className="bg-void-bg-card/50 rounded-lg p-4 border border-white/5">
              <div className="flex items-center gap-2 mb-2">
                <User className="w-4 h-4 text-neon-blue" />
                <span className="font-medium">{msg.name}</span>
                <span className="text-xs text-white/30">{msg.date}</span>
              </div>
              <p className="text-white/70 text-sm">{msg.content}</p>
            </div>
          ))
        )}
      </div>
    </section>
  )
}
