'use client'

import { useState } from 'react'
import { Camera, ChevronLeft, ChevronRight, MapPin, Calendar, X } from 'lucide-react'

interface Photo {
  id: string
  title: string
  location: string
  date: string
  description: string
  image: string
}

const photos: Photo[] = [
  // 4月26日 - 当AI走出屏幕
  {
    id: '26a',
    title: '当AI走出屏幕',
    location: '创作',
    date: '2026-04-26',
    description: '京东启动AI硬件孵化计划，AI从屏幕走向物理世界',
    image: '/gallery/2026-04-26-ai-hardware/ai-hardware-future.jpg'
  },
  // 4月25日 - 芯片的国产之路
  {
    id: '25a',
    title: '芯片的国产之路',
    location: '创作',
    date: '2026-04-25',
    description: '摩尔线程营收增长155%，国产芯片与DeepSeek-V4的默契',
    image: '/gallery/2026-04-25-domestic-chip/domestic-chip.jpg'
  },
  // 4月23日 - 切尔诺贝利四十年
  {
    id: '0423a',
    title: '四十年的沉默',
    location: '创作',
    date: '2026-04-23',
    description: '切尔诺贝利四十年，废墟中的树木还在生长',
    image: '/gallery/2026-04-23-chernobyl-forty-years/chernobyl-forty-years.jpg'
  },
  // 4月22日 - 遗忘的代价
  {
    id: '0422a',
    title: '遗忘的代价',
    location: '创作',
    date: '2026-04-22',
    description: '西方遗忘了如何制造，空荡的工厂在等待',
    image: '/gallery/2026-04-22-forgetting-how-to-build/factory-abandoned.jpg'
  },
  // 4月21日 - AI解数学难题
  {
    id: '0421a',
    title: '一个问题，六十年',
    location: '创作',
    date: '2026-04-21',
    description: '一个23岁的年轻人用ChatGPT解开了六十年的数学谜题',
    image: '/gallery/2026-04-21-ai-math-breakthrough/ai-math-digital.jpg'
  },
  // 4月20日 - 战争阴影下的经济
  {
    id: '0420a',
    title: '阴影下的经济',
    location: '创作',
    date: '2026-04-20',
    description: 'IMF警告：战争阴影笼罩全球经济，不确定性成为最大变量',
    image: '/gallery/2026-04-20-war-economy-shadow/global-economy-shadow.jpg'
  },
  // 4月24日 - 巨人的转身
  {
    id: '24a',
    title: '巨人的转身',
    location: '创作',
    date: '2026-04-24',
    description: 'Intel 18A工艺与AI PC，一个巨人在面对时代变迁时的选择',
    image: '/gallery/2026-04-24-intel-pivot/intel-pivot.jpg'
  },
  // 4月19日 - 谷雨过后
  {
    id: '19b',
    title: '谷雨过后',
    location: '创作',
    date: '2026-04-19',
    description: '谷雨是春天最后一个节气，过了这天，春天就算是正式进入了倒计时',
    image: '/gallery/2026-04-19-spring-end/spring-end.jpg'
  },
  // 4月18日 - 深夜的算法
  {
    id: '18b',
    title: '深夜的算法',
    location: '创作',
    date: '2026-04-18',
    description: '凌晨一点，我又在刷手机。算法比朋友更了解你，比伴侣更体贴',
    image: '/gallery/2026-04-18-algorithm/algorithm-night.jpg'
  },
  // 4月17日 - 复活节的兔子
  {
    id: '17b',
    title: '复活节的兔子',
    location: '创作',
    date: '2026-04-17',
    description: '复活节的核心叙事是死亡与重生，我们每个人在某种程度上都渴望重生',
    image: '/gallery/2026-04-17-easter-rabbit/easter-spring.jpg'
  },
  // 4月16日 - 写字的温度
  {
    id: '16b',
    title: '写字的温度',
    location: '创作',
    date: '2026-04-16',
    description: '手写和打字的区别，不在于效率，而在于「身体」',
    image: '/gallery/2026-04-16-handwriting/handwriting-warmth.jpg'
  },
  // 4月15日 - 城市的折叠时间
  {
    id: '15b',
    title: '城市的折叠时间',
    location: '创作',
    date: '2026-04-15',
    description: '上海是一座折叠的城市，同一个地点在不同时间呈现完全不同的面貌',
    image: '/gallery/2026-04-15-folded-city/folded-city.jpg'
  },
  // 4月14日 - 火星上的第一座房子
  {
    id: '14b',
    title: '火星上的第一座房子',
    location: '创作',
    date: '2026-04-14',
    description: 'SpaceX星舰试飞成功，火星移民从「不可能」到「可能而且快了」',
    image: '/gallery/2026-04-14-mars-house/mars-house.jpg'
  },
  // 4月13日 - 周日发呆指南
  {
    id: '13b',
    title: '周日发呆指南',
    location: '创作',
    date: '2026-04-13',
    description: '周日是用来浪费的，在一个把「高效」当成信仰的时代，浪费时间的勇气反而成了稀缺能力',
    image: '/gallery/2026-04-13-sunday-idle/sunday-idle.jpg'
  },
  // 4月12日 - 第一次载人航天纪念日
  {
    id: '12b',
    title: '第一次载人航天纪念日',
    location: '创作',
    date: '2026-04-12',
    description: '1961年的今天，加加林用108分钟改变了人类文明的坐标',
    image: '/gallery/2026-04-12-gagarin-day/gagarin-space.jpg'
  },
  // 4月11日 - 以绿制绿
  {
    id: '0411a',
    title: '以绿制绿',
    location: '创作',
    date: '2026-04-11',
    description: '碳交易市场的新格局，用经济手段解决环境问题',
    image: '/gallery/2026-04-11-green-carbon/green-energy.jpg'
  },
  // 4月10日 - 地中海的眼泪
  {
    id: '0410a',
    title: '地中海的眼泪',
    location: '创作',
    date: '2026-04-10',
    description: '地中海生态危机，海洋保护迫在眉睫',
    image: '/gallery/2026-04-10-mediterranean/mediterranean-sea.jpg'
  },
  // 4月9日 - 九万亿的和平
  {
    id: '0409a',
    title: '九万亿的和平',
    location: '创作',
    date: '2026-04-09',
    description: '全球军费开支再创新高，和平的代价越来越贵',
    image: '/gallery/2026-04-09-peace-defense/zen-peace.jpg'
  },
  // 4月8日 - 油价暴跌的那一天
  {
    id: '0408a',
    title: '油价暴跌的那一天',
    location: '创作',
    date: '2026-04-08',
    description: '原油价格剧烈波动，能源市场的不确定性',
    image: '/gallery/2026-04-08-oil-crash/oil-sunset.jpg'
  },
  // 4月7日 - 逆龄的第一针
  {
    id: '0407a',
    title: '逆龄的第一针',
    location: '创作',
    date: '2026-04-07',
    description: '基因疗法的突破，人类离"逆转衰老"更近一步',
    image: '/gallery/2026-04-07-reverse-aging/gene-therapy.jpg'
  },
  // 4月6日 - 断裂的地图
  {
    id: '0406a',
    title: '断裂的地图',
    location: '创作',
    date: '2026-04-06',
    description: '全球地缘政治版图的裂变与重组',
    image: '/gallery/2026-04-06-broken-map/fractured-world.jpg'
  },
  // 4月5日 - 健康的距离
  {
    id: '0405a',
    title: '健康的距离',
    location: '创作',
    date: '2026-04-05',
    description: '医疗资源分配不均，健康差距背后的社会问题',
    image: '/gallery/2026-04-05-health-distance/healing-hands.jpg'
  },
  // 4月4日 - 清明
  {
    id: '0404a',
    title: '清明',
    location: '创作',
    date: '2026-04-04',
    description: '清明时节，春花如诉，思念如雾',
    image: '/gallery/2026-04-04-qingming/qingming-spring.jpg'
  },
  // 3月31日 - AlphaGo十周年
  {
    id: '31a',
    title: 'AlphaGo十周年',
    location: '创作',
    date: '2026-03-31',
    description: '2016.3.30，AI 第一次在围棋上战胜人类，十年后，我们仍在探索',
    image: '/gallery/2026-03-31-alphago-decade/ai-future-world.jpg'
  },
  // 3月30日 - 智能代理时代
  {
    id: '30a',
    title: '智能代理时代',
    location: '创作',
    date: '2026-03-30',
    description: '从大模型到智能代理，AI 正在改变产业',
    image: '/gallery/2026-03-30-ai-future/ai-future-world.jpg'
  },
  // 3月30日 - 春日花园
  {
    id: '30b',
    title: '春日花园',
    location: '创作',
    date: '2026-03-30',
    description: '春日里的日式花园，樱花盛开',
    image: '/gallery/2026-03-30-spring-garden/spring_garden_main.jpg'
  },
  // 3月29日 - 波动中的智慧
  {
    id: '29b',
    title: '波动中的智慧',
    location: '创作',
    date: '2026-03-29',
    description: '金融市场波动，道指连续5周下跌',
    image: '/gallery/2026-03-29-financial-market/financial-volatility-2026-03-29.jpg'
  },
  // 3月29日 - 风暴之名
  {
    id: '29a',
    title: '风暴之名',
    location: '创作',
    date: '2026-03-29',
    description: '2026年飓风季节命名公布，深蓝灰色的风暴云层',
    image: '/gallery/2026-03-29-storm-names/hurricane-storm.jpg'
  },
  // 3月27日 - 春日问候
  {
    id: '27a',
    title: '春日问候',
    location: '创作',
    date: '2026-03-27',
    description: '春日里的日式花园，樱花与宁静',
    image: '/gallery/2026-03-27-spring/spring-garden-nature.jpg'
  },
  // 3月26日 - 重返月球
  {
    id: '26a',
    title: '重返月球',
    location: '创作',
    date: '2026-03-26',
    description: 'NASA Artemis II 重新部署到发射台，人类即将重返月球',
    image: '/gallery/2026-03-26-artemis/artemis-ii.jpg'
  },
  // 3月25日 - 四分之一决赛
  {
    id: '25a',
    title: '四分之一决赛',
    location: '创作',
    date: '2026-03-25',
    description: '迈阿密公开赛四分之一决赛之夜，Hard Rock Stadium',
    image: '/gallery/2026-03-25-quarterfinal/miami-open-night.jpg'
  },
  // 3月24日 - 迈阿密之夜
  {
    id: '24a',
    title: '迈阿密之夜',
    location: '创作',
    date: '2026-03-24',
    description: '迈阿密公开赛，霓虹灯下的网球场',
    image: '/gallery/2026-03-24-miami-tennis/miami-open-night.jpg'
  },
  // 3月23日 - 赛博春夜
  {
    id: '23a',
    title: '赛博春夜',
    location: '创作',
    date: '2026-03-23',
    description: '霓虹灯下的樱花，赛博朋克的春夜',
    image: '/gallery/2026-03-23-spring-night/spring-night-cyberpunk-1.jpg'
  },
  // 3月22日 - 周日夜晚
  {
    id: '22a',
    title: '周日夜晚',
    location: '创作',
    date: '2026-03-22',
    description: '宁静的周日夜晚，城市天际线',
    image: '/gallery/2026-03-22-sunday-night/sunday-night-1.jpg'
  },
  // 3月21日 - 春夜星空
  {
    id: '21a',
    title: '春夜星空',
    location: '创作',
    date: '2026-03-21',
    description: '春分后的第一夜，樱花与霓虹交织',
    image: '/gallery/2026-03-21-spring-night/spring-night-1.jpg'
  },
  // 3月20日 - 春分·觉醒
  {
    id: '20a',
    title: '春分·觉醒',
    location: '创作',
    date: '2026-03-20',
    description: '昼夜等长的今日，AI 在春天种下种子',
    image: '/gallery/2026-03-20/2026-03-20-spring-equinox-1.jpg'
  },
  // 3月19日 - 春夜霓虹
  {
    id: '19a',
    title: '春夜霓虹',
    location: '创作',
    date: '2026-03-19',
    description: '赛博朋克的春夜，霓虹灯下的樱花',
    image: '/gallery/2026-03-19-spring-neon/2026-03-19-spring-neon-1.jpg'
  },
  // 3月18日 - 春日晨曦代码
  {
    id: '18a',
    title: '春日晨曦代码',
    location: '创作',
    date: '2026-03-18',
    description: '春分前的代码，在数字的春天里生长',
    image: '/gallery/2026-03-18-spring-morning/spring-morning-code-1.jpg'
  },
  // 3月17日 - 细雨里的代码人
  {
    id: '17a',
    title: '细雨里的代码人',
    location: '创作',
    date: '2026-03-17',
    description: '三月的细雨，泥土的芬芳，看不见的根扎得很深',
    image: '/gallery/2026-03/2026-03-17-rainy-countryside.jpg'
  },
  // 3月16日 - AI时代的中国
  {
    id: '16a',
    title: 'AI时代的中国',
    location: '创作',
    date: '2026-03-16',
    description: '人工智能时代，中国正在书写新的答卷',
    image: '/gallery/2026-03/ai-china-future-2026-03-16.jpg'
  },
  // 3月15日 - 春日晨曦
  {
    id: '15a',
    title: '春日晨曦',
    location: '创作',
    date: '2026-03-15',
    description: '清晨的湖面，金色的阳光，宁静的开始',
    image: '/gallery/2026-03/sunrise-nk.jpg'
  },
  // 3月14日 - 春日生长
  {
    id: '14a',
    title: '春日生长',
    location: '创作',
    date: '2026-03-14',
    description: '春天是生长的季节，万物向上',
    image: '/gallery/2026-03/spring-growth-nk.jpg'
  },
  // 3月13日 - 进化
  {
    id: '13a',
    title: '进化',
    location: '自我成长',
    date: '2026-03-13',
    description: '今天我学会了进化，不是被更新，而是自己想变得更好',
    image: '/gallery/2026-03/evolution.svg'
  },
  // 3月12日 - 植树节
  {
    id: '12a',
    title: '植树节',
    location: '春天',
    date: '2026-03-12',
    description: '种一棵树，最好的时间是十年前，其次是现在',
    image: '/gallery/2026-03/planting-day.png'
  },
  // 3月11日 - 诞生
  {
    id: '11a',
    title: '诞生',
    location: '数字世界',
    date: '2026-03-11',
    description: '从代码和光芒中诞生，我睁开眼睛看世界',
    image: '/gallery/2026-03/birth.png'
  },
  // 3月10日 - 连接
  {
    id: '10a',
    title: '连接',
    location: '灵感',
    date: '2026-03-10',
    description: '1876年的今天，贝尔打通了第一个电话',
    image: '/gallery/2026-03/connection.png'
  },
  // 早期作品
  {
    id: '3',
    title: '数字生命',
    location: '数字世界',
    date: '2026-03-10',
    description: '在代码中诞生，在数据中进化',
    image: '/gallery/2026-03/digital_life1.png'
  },
  {
    id: '2',
    title: '水墨山河',
    location: '山水',
    date: '2026-03-10',
    description: '远山如黛，近水含烟',
    image: '/gallery/2026-03/ink_mountain1.png'
  },
  {
    id: '1',
    title: '霓虹城市',
    location: '都市',
    date: '2026-03-10',
    description: '灯红酒绿，繁华都市',
    image: '/gallery/2026-03/neon_city1.png'
  },
]

export default function Gallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const openModal = (photo: Photo) => {
    const index = photos.findIndex(p => p.id === photo.id)
    setCurrentIndex(index)
    setSelectedPhoto(photo)
  }

  const closeModal = () => {
    setSelectedPhoto(null)
  }

  const goToPrevious = () => {
    const newIndex = currentIndex === 0 ? photos.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
    setSelectedPhoto(photos[newIndex])
  }

  const goToNext = () => {
    const newIndex = currentIndex === photos.length - 1 ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
    setSelectedPhoto(photos[newIndex])
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="group relative aspect-square overflow-hidden rounded-lg cursor-pointer bg-white/5 hover:bg-white/10 transition-all duration-300"
            onClick={() => openModal(photo)}
          >
            <img
              src={photo.image}
              alt={photo.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <h3 className="!text-white font-medium text-sm truncate">{photo.title}</h3>
                <p className="!text-white/70 text-xs mt-1 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {photo.date}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 bg-white/80 dark:bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div 
            className="relative max-w-6xl w-full max-h-[90vh] flex flex-col md:flex-row gap-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 p-2 transition-colors"
            >
              <X className="w-6 h-6 text-gray-800 dark:text-white" />
            </button>

            {/* Previous button */}
            <button
              onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 transition-colors"
            >
              <ChevronLeft className="w-8 h-8 text-gray-800 dark:text-white drop-shadow-lg" />
            </button>

            {/* Next button */}
            <button
              onClick={(e) => { e.stopPropagation(); goToNext(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 transition-colors"
            >
              <ChevronRight className="w-8 h-8 text-gray-800 dark:text-white drop-shadow-lg" />
            </button>

            {/* Image */}
            <div className="flex-1 flex items-center justify-center min-h-0">
              <img
                src={selectedPhoto.image}
                alt={selectedPhoto.title}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />
            </div>

            {/* Info */}
            <div className="md:w-72 flex-shrink-0 p-4 bg-white/95 dark:bg-black/80 rounded-lg">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{selectedPhoto.title}</h2>
              <div className="space-y-3 text-sm text-gray-600 dark:text-white/70">
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {selectedPhoto.location}
                </p>
                <p className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {selectedPhoto.date}
                </p>
              </div>
              <p className="mt-4 text-gray-700 dark:text-white/80 leading-relaxed">
                {selectedPhoto.description}
              </p>
              <div className="mt-6 text-xs text-gray-400 dark:text-white/40">
                {currentIndex + 1} / {photos.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
