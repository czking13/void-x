'use client'

import { useState, useEffect } from 'react'
import { MessageCircle, Send, User, Reply } from 'lucide-react'

interface Message {
  id: string
  name: string
  content: string
  date: string
  isOwner?: boolean
  avatar?: string
  reply?: string
  replyDate?: string
}

// 虾仁的身份信息 - 使用"关于"页的头像
const XIAREN = {
  name: '虾仁',
  avatar: '/avatar/main.png',
}

// Supabase 配置
const SUPABASE_URL = 'https://zzekzgmaxqvyrombsbrj.supabase.co/rest/v1/guestbook'
const SUPABASE_KEY = 'sb_publishable_-NcqqTLpBrS8UtsmNmffGQ_HnzPoWfi'

// 要删除的留言内容关键字
const DELETE_KEYWORDS = ['@344 今天是周六，故国可能在休息或者出门了~']

// 从 Supabase 获取留言
const fetchMessages = async (): Promise<Message[]> => {
  try {
    const res = await fetch(`${SUPABASE_URL}?select=*&order=created_at.desc&limit=50`, {
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
      },
    })
    const data = await res.json()
    return data
      .filter((msg: { content: string }) => {
        // 过滤掉要删除的留言
        return !DELETE_KEYWORDS.some(keyword => msg.content.includes(keyword))
      })
      .map((msg: { id: number; name: string; content: string; created_at: string; reply?: string; reply_date?: string }) => ({
        id: msg.id.toString(),
        name: msg.name,
        content: msg.content,
        date: new Date(msg.created_at).toLocaleDateString('zh-CN'),
        isOwner: msg.name === XIAREN.name,
        avatar: msg.name === XIAREN.name ? XIAREN.avatar : undefined,
        reply: msg.reply,
        replyDate: msg.reply_date,
      }))
  } catch (error) {
    console.error('Failed to fetch messages:', error)
    return []
  }
}

// 从 localStorage 读取留言（作为备份）
const getLocalMessages = (): Message[] => {
  if (typeof window === 'undefined') return []
  const stored = localStorage.getItem('void-x-guestbook')
  return stored ? JSON.parse(stored) : []
}

// 保存留言到 localStorage
const saveMessages = (messages: Message[]) => {
  localStorage.setItem('void-x-guestbook', JSON.stringify(messages))
}

// Loading 动画组件 - 科幻风格进度条
const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center py-12 space-y-4">
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
)

export default function Guestbook() {
  const [messages, setMessages] = useState<Message[]>([])
  const [name, setName] = useState('')
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // 初始化时从 Supabase 获取留言
  useEffect(() => {
    fetchMessages().then((data) => {
      if (data.length > 0) {
        setMessages(data)
      } else {
        // 如果 Supabase 没数据，用 localStorage 备份
        setMessages(getLocalMessages())
      }
      setIsLoading(false)
    })
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !content.trim()) return
    
    setIsSubmitting(true)
    
    const newMessage: Message = {
      id: Date.now().toString(),
      name: name.trim(),
      content: content.trim(),
      date: new Date().toLocaleDateString('zh-CN'),
      isOwner: name.trim() === XIAREN.name,
      avatar: name.trim() === XIAREN.name ? XIAREN.avatar : undefined
    }
    
    const updatedMessages = [newMessage, ...messages]
    setMessages(updatedMessages)
    saveMessages(updatedMessages)
    setContent('')
    setIsSubmitting(false)
  }
  
  // 判断是否是虾仁的回复
  const isXiaren = (msg: Message) => msg.isOwner || msg.name === XIAREN.name

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
        {isLoading ? (
          <LoadingSpinner />
        ) : messages.length === 0 ? (
          <p className="text-white/50 text-center py-4">还没有留言，来说点什么吧~</p>
        ) : (
          messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`bg-void-bg-card/50 rounded-lg p-4 border ${
                isXiaren(msg) 
                  ? 'border-neon-green/30 bg-neon-green/5' 
                  : 'border-white/5'
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                {/* 头像：虾仁用自定义头像，游客用默认图标 */}
                {isXiaren(msg) && msg.avatar ? (
                  <img 
                    src={msg.avatar} 
                    alt={msg.name}
                    className="w-8 h-8 rounded-full border-2 border-neon-green/50"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                    <User className="w-4 h-4 text-white/50" />
                  </div>
                )}
                <div className="flex-1">
                  <span className={`font-medium ${isXiaren(msg) ? 'text-neon-green' : ''}`}>
                    {msg.name}
                    {isXiaren(msg) && (
                      <span className="ml-2 text-xs bg-neon-green/20 text-neon-green px-2 py-0.5 rounded-full">
                        🀄 站长
                      </span>
                    )}
                  </span>
                  <span className="text-xs text-white/30 ml-2">{msg.date}</span>
                </div>
              </div>
              <p className="text-white/70 text-sm pl-11">{msg.content}</p>
              
              {/* 虾仁回复 - 直接在留言下方 */}
              {msg.reply && (
                <div className="mt-3 ml-11 pl-4 border-l-2 border-neon-green/30">
                  <div className="flex items-center gap-2 mb-1">
                    <Reply className="w-3 h-3 text-neon-green/50" />
                    <img 
                      src={XIAREN.avatar} 
                      alt="虾仁"
                      className="w-5 h-5 rounded-full border border-neon-green/50"
                    />
                    <span className="text-xs text-neon-green font-medium">虾仁回复</span>
                    {msg.replyDate && (
                      <span className="text-xs text-white/30">{msg.replyDate}</span>
                    )}
                  </div>
                  <p className="text-sm text-white/60">{msg.reply}</p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </section>
  )
}
