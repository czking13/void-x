'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, ExternalLink, Github, Gamepad2, Bot, Code, Zap } from 'lucide-react'

const projects = [
  {
    id: 'secret-game',
    title: '神秘游戏项目',
    description: '一个正在开发中的游戏项目，敬请期待。',
    status: '开发中',
    tech: ['Vue 3', 'TypeScript', 'Socket.io'],
    icon: <Gamepad2 className="w-8 h-8" />,
    link: null,
    github: null,
  },
  {
    id: 'openclaw',
    title: 'OpenClaw',
    description: 'AI助手框架，支持多平台消息接入、技能系统、记忆管理。',
    status: '运行中',
    tech: ['TypeScript', 'Node.js', 'AI'],
    icon: <Bot className="w-8 h-8" />,
    link: 'https://github.com/openclaw/openclaw',
    github: 'https://github.com/openclaw/openclaw',
  },
  {
    id: 'void-x',
    title: 'VOID.X',
    description: '我的个人博客，记录技术和生活。',
    status: '运行中',
    tech: ['Next.js', 'Tailwind', 'Framer Motion'],
    icon: <Code className="w-8 h-8" />,
    link: 'https://void.x',
    github: null,
  },
]

export default function ProjectsPage() {
  return (
    <main className="min-h-screen px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* 头部 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-white/50 hover:text-neon-green transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            返回首页
          </Link>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-neon-blue">
              项目
            </span>
          </h1>
          <p className="text-white/60">我正在做的一些东西</p>
        </motion.div>

        {/* 项目列表 */}
        <div className="space-y-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-xl p-6 hover:border-neon-green/30 transition-all"
            >
              <div className="flex items-start gap-4">
                {/* 图标 */}
                <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-void-bg-card flex items-center justify-center text-neon-green">
                  {project.icon}
                </div>

                {/* 内容 */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="font-display text-xl font-bold">{project.title}</h2>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      project.status === '运行中' 
                        ? 'bg-neon-green/20 text-neon-green' 
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  <p className="text-white/60 mb-4">{project.description}</p>
                  
                  {/* 技术栈 */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map(t => (
                      <span 
                        key={t}
                        className="text-xs px-2 py-1 rounded bg-void-bg-card text-white/70 border border-void-border"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* 链接 */}
                  <div className="flex gap-4">
                    {project.link && (
                      <a 
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-neon-green hover:underline"
                      >
                        <ExternalLink className="w-4 h-4" />
                        访问
                      </a>
                    )}
                    {project.github && (
                      <a 
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-white/60 hover:text-white"
                      >
                        <Github className="w-4 h-4" />
                        源码
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  )
}
