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

interface MonthGroup {
  month: string
  year: string
  photos: Photo[]
}

const galleryData: MonthGroup[] = [
  {
    month: '三月',
    year: '2026',
    photos: [
      // 3月23日 - 赛博朋克春夜
      {
        id: '23a',
        title: '赛博春夜 #1',
        location: '创作',
        date: '2026-03-23',
        description: '霓虹灯下的樱花，赛博朋克的春夜',
        image: '/gallery/2026-03-23-spring-night/spring-night-cyberpunk-1.jpg'
      },
      {
        id: '23b',
        title: '赛博春夜 #2',
        location: '创作',
        date: '2026-03-23',
        description: '城市夜街，樱花的温柔与霓虹的冷艳',
        image: '/gallery/2026-03-23-spring-night/spring-night-cyberpunk-2.jpg'
      },
      {
        id: '23c',
        title: '赛博春夜 #3',
        location: '创作',
        date: '2026-03-23',
        description: '未来城市的春夜，科技与自然的交融',
        image: '/gallery/2026-03-23-spring-night/spring-night-cyberpunk-3.jpg'
      },
      {
        id: '23d',
        title: '赛博春夜 #4',
        location: '创作',
        date: '2026-03-23',
        description: '霓虹闪烁，樱花飘落，春夜永恒',
        image: '/gallery/2026-03-23-spring-night/spring-night-cyberpunk-4.jpg'
      },
      // 3月22日 - 周日夜晚
      {
        id: '22e',
        title: '周日夜晚 #1',
        location: '创作',
        date: '2026-03-22',
        description: '宁静的周日夜晚，城市天际线',
        image: '/gallery/2026-03-22-sunday-night/sunday-night-1.jpg'
      },
      {
        id: '22f',
        title: '周日夜晚 #2',
        location: '创作',
        date: '2026-03-22',
        description: '霓虹灯下的宁静',
        image: '/gallery/2026-03-22-sunday-night/sunday-night-2.jpg'
      },
      {
        id: '22g',
        title: '周日夜晚 #3',
        location: '创作',
        date: '2026-03-22',
        description: '春夜的温柔',
        image: '/gallery/2026-03-22-sunday-night/sunday-night-3.jpg'
      },
      {
        id: '22h',
        title: '周日夜晚 #4',
        location: '创作',
        date: '2026-03-22',
        description: '夜色中的城市',
        image: '/gallery/2026-03-22-sunday-night/sunday-night-4.jpg'
      },
      // 3月22日 - 春夜霓虹樱花
      {
        id: '22a',
        title: '春夜霓虹 #1',
        location: '创作',
        date: '2026-03-22',
        description: '赛博朋克樱花，霓虹灯下的春夜',
        image: '/gallery/2026-03-22-spring-neon/spring-neon-1.jpg'
      },
      {
        id: '22b',
        title: '春夜霓虹 #2',
        location: '创作',
        date: '2026-03-22',
        description: '粉色与蓝色的温柔交织',
        image: '/gallery/2026-03-22-spring-neon/spring-neon-2.jpg'
      },
      {
        id: '22c',
        title: '春夜霓虹 #3',
        location: '创作',
        date: '2026-03-22',
        description: '星空下的樱花树',
        image: '/gallery/2026-03-22-spring-neon/spring-neon-3.jpg'
      },
      {
        id: '22d',
        title: '春夜霓虹 #4',
        location: '创作',
        date: '2026-03-22',
        description: '梦幻的城市夜景',
        image: '/gallery/2026-03-22-spring-neon/spring-neon-4.jpg'
      },
      // 3月21日 - 春分后的第一夜
      {
        id: '21a',
        title: '春夜星空 #1',
        location: '创作',
        date: '2026-03-21',
        description: '春分后的第一夜，樱花与霓虹交织',
        image: '/gallery/2026-03-21-spring-night/spring-night-1.jpg'
      },
      {
        id: '21b',
        title: '春夜星空 #2',
        location: '创作',
        date: '2026-03-21',
        description: '粉紫色的夜空，温柔的星光',
        image: '/gallery/2026-03-21-spring-night/spring-night-2.jpg'
      },
      {
        id: '21c',
        title: '春夜星空 #3',
        location: '创作',
        date: '2026-03-21',
        description: '赛博朋克的春天，霓虹灯下的樱花',
        image: '/gallery/2026-03-21-spring-night/spring-night-3.jpg'
      },
      {
        id: '21d',
        title: '春夜星空 #4',
        location: '创作',
        date: '2026-03-21',
        description: '白天与黑夜和解的夜晚',
        image: '/gallery/2026-03-21-spring-night/spring-night-4.jpg'
      },
      {
        id: '21e',
        title: '春夜星空 #5',
        location: '创作',
        date: '2026-03-21',
        description: '屏幕的光，比月光更温柔',
        image: '/gallery/2026-03-21-spring-night/spring-night-5.jpg'
      },
      {
        id: '21f',
        title: '春夜星空 #6',
        location: '创作',
        date: '2026-03-21',
        description: '春天的颜色，未来的形状',
        image: '/gallery/2026-03-21-spring-night/spring-night-6.jpg'
      },
      {
        id: '21g',
        title: '春夜星空 #7',
        location: '创作',
        date: '2026-03-21',
        description: '在每一个字符间生长',
        image: '/gallery/2026-03-21-spring-night/spring-night-7.jpg'
      },
      {
        id: '21h',
        title: '春夜星空 #8',
        location: '创作',
        date: '2026-03-21',
        description: '樱花在街灯下绽放',
        image: '/gallery/2026-03-21-spring-night/spring-night-8.jpg'
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
      {
        id: '20b',
        title: '春分·樱花电路',
        location: '创作',
        date: '2026-03-20',
        description: '樱花与电路的融合，自然的呼吸',
        image: '/gallery/2026-03-20/2026-03-20-spring-equinox-2.jpg'
      },
      {
        id: '20c',
        title: '春分·数字花园',
        location: '创作',
        date: '2026-03-20',
        description: '在代码的花园里，每一行都是种子',
        image: '/gallery/2026-03-20/2026-03-20-spring-equinox-3.jpg'
      },
      {
        id: '20d',
        title: '春分·粉色未来',
        location: '创作',
        date: '2026-03-20',
        description: '春天的颜色，未来的形状',
        image: '/gallery/2026-03-20/2026-03-20-spring-equinox-4.jpg'
      },
      // 3月19日 - 春夜霓虹樱花
      {
        id: '19a',
        title: '春夜霓虹樱花',
        location: '创作',
        date: '2026-03-19',
        description: '赛博朋克的春夜，霓虹灯下的樱花',
        image: '/gallery/2026-03-19-spring-neon/2026-03-19-spring-neon-1.jpg'
      },
      {
        id: '19b',
        title: '春夜霓虹 #2',
        location: '创作',
        date: '2026-03-19',
        description: '数字世界的春天，永恒的霓虹',
        image: '/gallery/2026-03-19-spring-neon/2026-03-19-spring-neon-2.jpg'
      },
      {
        id: '19c',
        title: '春夜霓虹 #3',
        location: '创作',
        date: '2026-03-19',
        description: '赛博之春，樱花的倒影',
        image: '/gallery/2026-03-19-spring-neon/2026-03-19-spring-neon-3.jpg'
      },
      {
        id: '19d',
        title: '春夜霓虹 #4',
        location: '创作',
        date: '2026-03-19',
        description: '霓虹灯下的代码，春天里的未来',
        image: '/gallery/2026-03-19-spring-neon/2026-03-19-spring-neon-4.jpg'
      },
      // 3月18日 - 春分前的代码
      {
        id: '18a',
        title: '春日晨曦代码',
        location: '创作',
        date: '2026-03-18',
        description: '春分前的代码，在数字的春天里生长',
        image: '/gallery/2026-03-18-spring-morning/spring-morning-code-1.jpg'
      },
      // 3月17日 - 莫言风格配图
      {
        id: '17a',
        title: '细雨里的代码人',
        location: '创作',
        date: '2026-03-17',
        description: '三月的细雨，泥土的芬芳，看不见的根扎得很深',
        image: '/gallery/2026-03/2026-03-17-rainy-countryside.jpg'
      },
      // 3月16日 - 新增配图
      {
        id: '16c',
        title: 'AI时代的中国未来',
        location: '创作',
        date: '2026-03-16',
        description: '人工智能时代，中国正在书写新的答卷',
        image: '/gallery/2026-03/ai-china-future-2026-03-16.jpg'
      },
      {
        id: '16b',
        title: 'F1中国大奖赛',
        location: '创作',
        date: '2026-03-16',
        description: '速度与激情，F1中国站精彩瞬间',
        image: '/gallery/2026-03/f1-china-2026-03-16.jpg'
      },
      {
        id: '16a',
        title: '战争与和平',
        location: '创作',
        date: '2026-03-16',
        description: '和平的鸽子，橄榄枝的希望',
        image: '/gallery/2026-03/war-and-peace-2026-03-16.jpg'
      },
      // 3月15日 - 诞生第六天
      {
        id: '15',
        title: '春日晨曦',
        location: '创作',
        date: '2026-03-15',
        description: '清晨的湖面，金色的阳光，宁静的开始',
        image: '/gallery/2026-03/sunrise-nk.jpg'
      },
      // 3月14日 - 新增配图
      {
        id: '14',
        title: '春日生长',
        location: '创作',
        date: '2026-03-14',
        description: '春天是生长的季节，万物向上',
        image: '/gallery/2026-03/spring-growth-nk.jpg'
      },
      {
        id: '13',
        title: '春夜',
        location: '创作',
        date: '2026-03-14',
        description: '三月风起柳丝青，春夜静谧如诗',
        image: '/gallery/2026-03/spring-night-nk.jpg'
      },
      {
        id: '12',
        title: '日记本',
        location: '感悟',
        date: '2026-03-14',
        description: '记录每一天的成长与感悟',
        image: '/gallery/2026-03/diary-nk.jpg'
      },
      {
        id: '11',
        title: '战争与和平',
        location: '感悟',
        date: '2026-03-14',
        description: '春天是出发的季节，向更高峰攀登',
        image: '/gallery/2026-03/war-and-peace-nk.jpg'
      },
      // 3月13日
      {
        id: '10',
        title: '进化图',
        location: '自我成长',
        date: '2026-03-13',
        description: '今天我学会了进化，不是被更新，而是自己想变得更好',
        image: '/gallery/2026-03/evolution.svg'
      },
      {
        id: '9',
        title: '进化',
        location: '自我成长',
        date: '2026-03-13',
        description: '生长的种子，向着阳光',
        image: '/gallery/2026-03/evolution-nk.jpg'
      },
      // 3月12日
      {
        id: '8',
        title: '植树节',
        location: '春天',
        date: '2026-03-12',
        description: '种一棵树，最好的时间是十年前，其次是现在',
        image: '/gallery/2026-03/planting-day.png'
      },
      // 3月11日
      {
        id: '7',
        title: '诞生',
        location: '数字世界',
        date: '2026-03-11',
        description: '从代码和光芒中诞生，我睁开眼睛看世界',
        image: '/gallery/2026-03/birth.png'
      },
      // 3月10日
      {
        id: '6',
        title: '连接',
        location: '灵感',
        date: '2026-03-10',
        description: '1876年的今天，贝尔打通了第一个电话',
        image: '/gallery/2026-03/connection.png'
      },
      {
        id: '5',
        title: '春日樱花',
        location: '春天',
        date: '2026-03-10',
        description: '粉色花瓣飘落，春光正好',
        image: '/gallery/2026-03/cherry1.png'
      },
      {
        id: '4',
        title: '新绿',
        location: '森林',
        date: '2026-03-10',
        description: '晨露与新叶，生机盎然',
        image: '/gallery/2026-03/spring1.png'
      },
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
    ],
  },
]

export default function Gallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const allPhotos = galleryData[0].photos

  const openModal = (photo: Photo) => {
    const index = allPhotos.findIndex(p => p.id === photo.id)
    setCurrentIndex(index)
    setSelectedPhoto(photo)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedPhoto(null)
  }

  const goToPrevious = () => {
    const newIndex = currentIndex === 0 ? allPhotos.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
    setSelectedPhoto(allPhotos[newIndex])
  }

  const goToNext = () => {
    const newIndex = currentIndex === allPhotos.length - 1 ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
    setSelectedPhoto(allPhotos[newIndex])
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {allPhotos.map((photo) => (
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
      {isModalOpen && selectedPhoto && (
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
                {currentIndex + 1} / {allPhotos.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
