'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SKRIBBL_URL = 'https://skribbl.io/'

// Celebratory GIF (Happy Cat – public)
const CELEBRATE_GIF = 'https://media.giphy.com/media/3bqtLDeE1d4k8/giphy.gif'

const CONFETTI_COLORS = ['#ec4899', '#f472b6', '#fbbf24', '#f97316', '#a855f7', '#f43f5e', '#fff']
const CONFETTI_COUNT = 80

const NO_BUTTON_TEXTS = [
  'No',
  'Are you sure?',
  'Really?',
  'Think again...',
  "You're misclicking!",
  "Okay, the No button is broken now.",
]

const SAD_MEME_EMOJIS = ['😿', '😢', '🥺', '😭', '💔', '⏳']
const MAX_NO_CLICKS = 5
const YES_GROW_PER_CLICK = 0.2
const NO_SHRINK_SCALE_PER_CLICK = 0.18
const NO_FADE_PER_CLICK = 0.2

function useWindowSize() {
  const [size, setSize] = useState({ width: 0, height: 0 })
  useEffect(() => {
    const update = () => setSize({ width: window.innerWidth, height: window.innerHeight })
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])
  return size
}

function ConfettiBurst({ onComplete }: { onComplete: () => void }) {
  const { width, height } = useWindowSize()
  const particles = useMemo(
    () =>
      Array.from({ length: CONFETTI_COUNT }, (_, i) => ({
        id: i,
        x: width / 2,
        y: height / 2,
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        rotation: Math.random() * 360,
        scale: 0.6 + Math.random() * 0.8,
        delay: Math.random() * 0.15,
        duration: 2.2 + Math.random() * 1.2,
        tx: (Math.random() - 0.5) * width * 1.2,
        ty: (Math.random() - 0.5) * height * 1.2 - 100,
        rotationEnd: (Math.random() - 0.5) * 720,
      })),
    [width, height]
  )

  useEffect(() => {
    const t = setTimeout(onComplete, 4500)
    return () => clearTimeout(t)
  }, [onComplete])

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute w-3 h-3 rounded-sm"
          style={{
            left: p.x,
            top: p.y,
            backgroundColor: p.color,
            boxShadow: '0 0 6px rgba(0,0,0,0.2)',
          }}
          initial={{ x: 0, y: 0, opacity: 1, rotate: p.rotation, scale: p.scale }}
          animate={{
            x: p.tx,
            y: p.ty,
            opacity: [1, 1, 0],
            rotate: p.rotation + p.rotationEnd,
            scale: [p.scale, p.scale * 0.8],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            type: 'spring',
            stiffness: 50,
            damping: 12,
          }}
        />
      ))}
    </div>
  )
}

export default function SkribblInvite() {
  const [saidYes, setSaidYes] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [noClicks, setNoClicks] = useState(0)
  const [sadMeme, setSadMeme] = useState<string | null>(null)

  const yesScale = 1 + noClicks * YES_GROW_PER_CLICK
  const noScale = Math.max(0.1, 1 - noClicks * NO_SHRINK_SCALE_PER_CLICK)
  const noOpacity = Math.max(0, 1 - noClicks * NO_FADE_PER_CLICK)
  const noButtonText = NO_BUTTON_TEXTS[Math.min(noClicks, NO_BUTTON_TEXTS.length - 1)]
  const noButtonGone = noClicks >= MAX_NO_CLICKS

  const handleNoClick = () => {
    if (noClicks >= MAX_NO_CLICKS) return
    setSadMeme(SAD_MEME_EMOJIS[Math.min(noClicks, SAD_MEME_EMOJIS.length - 1)])
    setNoClicks((c) => c + 1)
  }

  useEffect(() => {
    if (!sadMeme) return
    const t = setTimeout(() => setSadMeme(null), 2200)
    return () => clearTimeout(t)
  }, [sadMeme])

  const handleYesClick = () => {
    setSaidYes(true)
    setShowConfetti(true)
  }

  const confettiDone = () => setShowConfetti(false)

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center px-4 py-8 sm:py-12"
      style={{
        background: 'linear-gradient(135deg, rgba(255,240,245,0.95) 0%, rgba(255,228,230,0.9) 50%, rgba(255,182,193,0.85) 100%)',
      }}
    >
      {/* Glassmorphism card */}
      <div
        className="relative w-full max-w-lg rounded-3xl p-6 sm:p-10 flex flex-col items-center text-center shadow-2xl border border-white/40"
        style={{
          background: 'rgba(255, 255, 255, 0.35)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          boxShadow: '0 8px 32px rgba(255, 182, 193, 0.25), inset 0 1px 0 rgba(255,255,255,0.6)',
        }}
      >
        {showConfetti && <ConfettiBurst onComplete={confettiDone} />}

        <AnimatePresence mode="wait">
          {saidYes ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 24 }}
              className="flex flex-col items-center gap-6"
            >
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent"
              >
                Yay! Let&apos;s play! 🎨❤️
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.25, type: 'spring', stiffness: 260, damping: 20 }}
                className="rounded-2xl overflow-hidden border-2 border-white/60 shadow-xl"
              >
                <img
                  src={CELEBRATE_GIF}
                  alt="Celebration"
                  className="w-48 h-48 sm:w-56 sm:h-56 object-cover"
                />
              </motion.div>

              <motion.a
                href={SKRIBBL_URL}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="inline-block px-8 py-4 rounded-2xl font-bold text-lg text-white shadow-lg border-2 border-white/40"
                style={{
                  background: 'linear-gradient(135deg, #ec4899 0%, #f43f5e 50%, #e11d48 100%)',
                  boxShadow: '0 8px 24px rgba(236, 72, 153, 0.45), inset 0 1px 0 rgba(255,255,255,0.3)',
                }}
              >
                Join our Skribbl.io Room
              </motion.a>
            </motion.div>
          ) : (
            <motion.div
              key="ask"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center gap-8"
            >
              <motion.h1
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 leading-tight"
              >
                Will you be my Player 2 for Skribbl today? 🎨
              </motion.h1>

              {/* Meme react – sad emoji per No click */}
              <AnimatePresence>
                {sadMeme && (
                  <motion.div
                    key="sad-meme"
                    initial={{ opacity: 0, scale: 0.5, y: 0 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="text-4xl sm:text-5xl min-h-[3rem] flex items-center justify-center"
                  >
                    {sadMeme === '⏳' ? (
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
                      >
                        ⏳
                      </motion.span>
                    ) : (
                      sadMeme
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="relative w-full min-h-[140px] flex flex-wrap items-center justify-center gap-4">
                {/* Yes button – grows by 0.2 each No click, smooth spring */}
                <motion.button
                  type="button"
                  onClick={handleYesClick}
                  className="relative z-10 px-8 py-4 sm:px-10 sm:py-5 rounded-2xl font-bold text-lg sm:text-xl text-white border-2 border-white/50 select-none"
                  style={{
                    background: 'linear-gradient(135deg, #ec4899 0%, #f472b6 50%, #f43f5e 100%)',
                    boxShadow: '0 6px 20px rgba(236, 72, 153, 0.4), inset 0 1px 0 rgba(255,255,255,0.4)',
                  }}
                  animate={{ scale: yesScale }}
                  transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                  whileHover={{ scale: yesScale * 1.05 }}
                  whileTap={{ scale: yesScale * 0.98 }}
                >
                  Yes
                </motion.button>

                {/* No button – shrinks & fades, text sequence; after 5 clicks: gone or second Yes */}
                {!noButtonGone ? (
                  <motion.button
                    type="button"
                    onClick={handleNoClick}
                    className="relative z-[50] px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold text-gray-600 select-none overflow-hidden"
                    style={{
                      background: 'linear-gradient(105deg, #9ca3af 0%, #d1d5db 45%, #f3f4f6 50%, #d1d5db 55%, #9ca3af 100%)',
                      backgroundSize: '200% 100%',
                      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.8), 0 2px 8px rgba(0,0,0,0.08)',
                    }}
                    animate={{ scale: noScale, opacity: noOpacity }}
                    transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                    whileHover={{ scale: noScale * 1.05 }}
                    whileTap={{ scale: noScale * 0.95 }}
                  >
                    <span className="relative z-10">{noButtonText}</span>
                    <motion.span
                      className="absolute inset-0 pointer-events-none opacity-50"
                      style={{
                        background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.7) 50%, transparent 100%)',
                        width: '60%',
                      }}
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ repeat: Infinity, duration: 2.2, repeatType: 'loop' }}
                    />
                  </motion.button>
                ) : (
                  <motion.button
                    type="button"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                    onClick={handleYesClick}
                    className="relative z-10 px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-bold text-white border-2 border-white/50 select-none"
                    style={{
                      background: 'linear-gradient(135deg, #ec4899 0%, #f472b6 50%, #f43f5e 100%)',
                      boxShadow: '0 4px 16px rgba(236, 72, 153, 0.4), inset 0 1px 0 rgba(255,255,255,0.4)',
                    }}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    Yes
                  </motion.button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
