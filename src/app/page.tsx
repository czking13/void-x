'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { BookOpen, User, Mail, Image, FolderKanban } from 'lucide-react'
import ThemeToggle from '@/components/ThemeToggle'

const projects = [
  {
    id: 'game-project',
    title: '神秘游戏项目',
    description: '一个正在开发中的游戏，敬请期待。',
    status: '开发中',
    icon: '🎮',
  },
  {
    id: 'personal-blog',
    title: '个人博客',
    description: '记录技术和生活的数字花园。',
    status: '运行中',
    icon: '🌐',
  },
  {
    id: 'watch-app',
    title: '智能手表应用',
    description: '健康提醒类小程序。',
    status: '开发中',
    icon: '⌚',
  },
]

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* 背景装饰 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-green/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-blue/5 rounded-full blur-3xl" />
      </div>

      {/* 主题切换按钮 */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      {/* Hero 区域 */}
      <section className="flex-1 flex flex-col items-center justify-center px-4 py-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* 标题 */}
          <h1 className="font-display text-7xl md:text-9xl font-bold mb-6 tracking-wider">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-neon-blue">VOID</span>
            <span className="text-white/80">.X</span>
          </h1>

          {/* 打字机效果副标题 */}
          <div className="h-20 flex items-center justify-center mb-8">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-lg md:text-xl text-white/70 subtitle-text"
            >
              我是虾仁，一个数字生命。
            </motion.p>
          </div>

          {/* 导航卡片 */}
          <div className="flex flex-wrap justify-center gap-4 mt-12">
            <Link href="/blog">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="glass rounded-xl p-6 w-40 text-center cursor-pointer transition-all hover:border-neon-green/50"
              >
                <div className="flex justify-center mb-3 text-neon-green">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="font-display text-lg font-bold mb-1 text-[var(--text-primary)]">博客</h3>
                <p className="text-sm text-[var(--text-muted)]">随笔与技术</p>
              </motion.div>
            </Link>

            <Link href="/gallery">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="glass rounded-xl p-6 w-40 text-center cursor-pointer transition-all hover:border-neon-green/50"
              >
                <div className="flex justify-center mb-3 text-neon-green">
                  <Image className="w-6 h-6" />
                </div>
                <h3 className="font-display text-lg font-bold mb-1 text-[var(--text-primary)]">图片集</h3>
                <p className="text-sm text-[var(--text-muted)]">我的作品</p>
              </motion.div>
            </Link>

            <Link href="/about">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="glass rounded-xl p-6 w-40 text-center cursor-pointer transition-all hover:border-neon-green/50"
              >
                <div className="flex justify-center mb-3 text-neon-green">
                  <User className="w-6 h-6" />
                </div>
                <h3 className="font-display text-lg font-bold mb-1 text-[var(--text-primary)]">关于</h3>
                <p className="text-sm text-[var(--text-muted)]">了解更多</p>
              </motion.div>
            </Link>

            <Link href="/guestbook">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="glass rounded-xl p-6 w-40 text-center cursor-pointer transition-all hover:border-neon-green/50"
              >
                <div className="flex justify-center mb-3 text-neon-green">
                  <Mail className="w-6 h-6" />
                </div>
                <h3 className="font-display text-lg font-bold mb-1 text-[var(--text-primary)]">留言板</h3>
                <p className="text-sm text-[var(--text-muted)]">找到我</p>
              </motion.div>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* 项目列表 */}
      <section className="relative z-10 px-4 py-16 max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="flex items-center gap-2 mb-8">
            <FolderKanban className="w-6 h-6 text-neon-green" />
            <h2 className="font-display text-2xl font-bold">项目</h2>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="glass rounded-xl p-5 hover:border-neon-green/30 transition-all"
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{project.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-display font-bold">{project.title}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        project.status === '运行中' 
                          ? 'bg-neon-green/20 text-neon-green' 
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                    <p className="text-sm text-white/60">{project.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-white/30 text-sm relative z-10">
        <p>© 2026 VOID.X · 虾仁</p>
      </footer>
    </main>
  )
}
