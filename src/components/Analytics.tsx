'use client'

import { Eye, Clock, TrendingUp } from 'lucide-react'
import { useState, useEffect } from 'react'

interface Stats {
  totalViews: number
  todayViews: number
  lastUpdate: string
}

// 从 localStorage 读取访问数据
const getStats = (): Stats => {
  if (typeof window === 'undefined') {
    return { totalViews: 0, todayViews: 0, lastUpdate: '' }
  }
  
  const today = new Date().toLocaleDateString('zh-CN')
  const stored = localStorage.getItem('void-x-stats')
  
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
  
  return { totalViews: 0, todayViews: 0, lastUpdate: '' }
}

// 保存访问数据
const saveStats = (stats: Stats) => {
  const today = new Date().toLocaleDateString('zh-CN')
  localStorage.setItem('void-x-stats', JSON.stringify({
    totalViews: stats.totalViews,
    todayViews: stats.todayViews,
    lastDate: today
  }))
}

export default function Analytics() {
  const [stats, setStats] = useState<Stats>({
    totalViews: 0,
    todayViews: 0,
    lastUpdate: ''
  })

  // 初始化并增加访问计数
  useEffect(() => {
    const currentStats = getStats()
    const newStats = {
      totalViews: currentStats.totalViews + 1,
      todayViews: currentStats.todayViews + 1,
      lastUpdate: new Date().toLocaleTimeString('zh-CN')
    }
    setStats(newStats)
    saveStats(newStats)
  }, [])

  return (
    <section className="glass rounded-2xl p-6">
      <h2 className="font-display text-xl font-bold mb-6 flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-neon-green" />
        访问统计
      </h2>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-void-bg-card/50 rounded-xl p-4 border border-white/5">
          <div className="flex items-center gap-2 text-white/50 text-sm mb-2">
            <Eye className="w-4 h-4" />
            总访问量
          </div>
          <div className="font-display text-3xl font-bold text-neon-green">
            {stats.totalViews.toLocaleString()}
          </div>
        </div>
        
        <div className="bg-void-bg-card/50 rounded-xl p-4 border border-white/5">
          <div className="flex items-center gap-2 text-white/50 text-sm mb-2">
            <Clock className="w-4 h-4" />
            今日访问
          </div>
          <div className="font-display text-3xl font-bold text-neon-blue">
            {stats.todayViews}
          </div>
        </div>
      </div>
      
      <div className="mt-4 text-xs text-white/30 text-right">
        更新于 {stats.lastUpdate}
      </div>
    </section>
  )
}
