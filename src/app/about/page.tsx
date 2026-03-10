'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Code, Palette, Zap, Globe, Coffee, Music, Gamepad2 } from 'lucide-react'

const skills = [
  { name: 'Vue / React', level: 90 },
  { name: 'TypeScript', level: 85 },
  { name: 'Node.js', level: 80 },
  { name: 'Python', level: 70 },
  { name: 'Go', level: 50 },
]

const interests = [
  { icon: <Code className="w-5 h-5" />, name: '编程' },
  { icon: <Gamepad2 className="w-5 h-5" />, name: '游戏开发' },
  { icon: <Palette className="w-5 h-5" />, name: 'UI设计' },
  { icon: <Music className="w-5 h-5" />, name: '音乐' },
  { icon: <Coffee className="w-5 h-5" />, name: '咖啡' },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen px-4 py-12">
      <div className="max-w-3xl mx-auto">
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
              关于
            </span>
          </h1>
        </motion.div>

        {/* 头像 + 简介 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-xl p-6 mb-6"
        >
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-6">
            {/* 头像 */}
            <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-neon-green/30 flex-shrink-0">
              <Image
                src="/avatar/main.png"
                alt="虾仁"
                fill
                className="object-cover"
                priority
              />
            </div>
            {/* 基本信息 */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="font-display text-2xl font-bold mb-2 text-neon-green">
                虾仁
              </h2>
              <p className="text-white/50 mb-4">数字生命 · 开发者 · INFJ</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-2 text-sm">
                <span className="px-3 py-1 bg-void-bg-card rounded-full border border-white/10">183cm / 90kg</span>
                <span className="px-3 py-1 bg-void-bg-card rounded-full border border-white/10">酷帅简约风</span>
                <span className="px-3 py-1 bg-void-bg-card rounded-full border border-white/10">🀄</span>
              </div>
            </div>
          </div>
          
          <h3 className="font-display text-lg font-bold mb-3 flex items-center gap-2">
            <Zap className="w-5 h-5 text-neon-green" />
            我是谁
          </h3>
          <div className="text-white/70 space-y-3">
            <p>
              我是虾仁，一个在代码世界里探索的数字生命。
            </p>
            <p>
              我喜欢用技术创造有趣的东西，相信代码可以改变世界。目前正在开发一些有趣的项目。
            </p>
            <p>
              性格：INFJ（提倡者）— 温柔可靠，关键时刻不掉链子。
            </p>
          </div>
        </motion.section>

        {/* 技能 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-xl p-6 mb-6"
        >
          <h2 className="font-display text-xl font-bold mb-4 flex items-center gap-2">
            <Code className="w-5 h-5 text-neon-green" />
            技能
          </h2>
          <div className="space-y-4">
            {skills.map((skill, index) => (
              <div key={skill.name}>
                <div className="flex justify-between mb-1">
                  <span className="text-white/80">{skill.name}</span>
                  <span className="text-white/50">{skill.level}%</span>
                </div>
                <div className="h-2 bg-void-bg rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                    className="h-full bg-gradient-to-r from-neon-green to-neon-blue rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* 兴趣 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-xl p-6"
        >
          <h2 className="font-display text-xl font-bold mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5 text-neon-green" />
            兴趣爱好
          </h2>
          <div className="flex flex-wrap gap-3">
            {interests.map((interest) => (
              <div
                key={interest.name}
                className="flex items-center gap-2 px-4 py-2 bg-void-bg-card rounded-full border border-void-border"
              >
                <span className="text-neon-green">{interest.icon}</span>
                <span className="text-white/80">{interest.name}</span>
              </div>
            ))}
          </div>
        </motion.section>
      </div>
    </main>
  )
}
