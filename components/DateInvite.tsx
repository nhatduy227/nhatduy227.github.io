'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Confetti from 'react-confetti'

const DEFAULT_TIME = '7:00 PM'

// Placeholder URLs – replace with your Dudu, Bubu, and celebration GIF URLs
const DUDU_IMAGE_URL = ''
const BUBU_IMAGE_URL = ''
const CELEBRATE_GIF_URL = '' // Dudu & Bubu celebration GIF – show when she clicks Yes

const NO_ATTEMPT_MESSAGES = [
  'Nice try!',
  'Too slow!',
  'You really want to say no? 🥺',
  'Almost had it… nope!',
  'Still going with no? 😢',
  'My heart can\'t take it!',
  'Okay okay, one more chance?',
  'You\'re really committed to this 😂',
  'I believe in you… say yes! 💕',
]

const SKRIBBL_URL = 'https://skribbl.io/'

const PADDING = 100
const MIN_DISTANCE_FROM_YES_CENTER = 150
const MOBILE_SAFE_ZONE_WIDTH = 220
const MOBILE_SAFE_ZONE_HEIGHT = 120
const MOBILE_BREAKPOINT = 600
const GIVE_UP_AFTER_ATTEMPTS = 10

export default function DateInvite() {
  const [saidYes, setSaidYes] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 80, y: 60 })
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
  const [noButtonVisible, setNoButtonVisible] = useState(true)
  const [noAttempts, setNoAttempts] = useState(0)
  const [gaveUp, setGaveUp] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const buttonAreaRef = useRef<HTMLDivElement>(null)
  const yesButtonRef = useRef<HTMLButtonElement>(null)
  const noButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const updateSize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  const getSafeRandomPosition = useCallback(() => {
    const area = buttonAreaRef.current
    const yesBtn = yesButtonRef.current
    const noBtn = noButtonRef.current
    const heading = headingRef.current
    if (!area || !yesBtn || !noBtn) return null
    const areaRect = area.getBoundingClientRect()
    const yesRect = yesBtn.getBoundingClientRect()
    const noBtnRect = noBtn.getBoundingClientRect()
    const btnW = noBtnRect.width
    const btnH = noBtnRect.height
    const padding = PADDING
    const maxWidth = window.innerWidth - padding
    const maxHeight = window.innerHeight - padding

    const yesCenterX = yesRect.left + yesRect.width / 2
    const yesCenterY = yesRect.top + yesRect.height / 2

    const distFromYesCenter = (x: number, y: number) => {
      const noCenterX = areaRect.left + x + btnW / 2
      const noCenterY = areaRect.top + y + btnH / 2
      return Math.hypot(noCenterX - yesCenterX, noCenterY - yesCenterY)
    }

    let rangeMinX: number
    let rangeMaxX: number
    let rangeMinY: number
    let rangeMaxY: number

    if (window.innerWidth < MOBILE_BREAKPOINT) {
      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2
      rangeMinX = centerX - MOBILE_SAFE_ZONE_WIDTH / 2 - areaRect.left
      rangeMaxX = centerX + MOBILE_SAFE_ZONE_WIDTH / 2 - areaRect.left - btnW
      rangeMinY = centerY - MOBILE_SAFE_ZONE_HEIGHT / 2 - areaRect.top
      rangeMaxY = centerY + MOBILE_SAFE_ZONE_HEIGHT / 2 - areaRect.top - btnH
    } else {
      rangeMinX = padding - areaRect.left
      rangeMaxX = maxWidth - padding - areaRect.left - btnW
      rangeMinY = padding - areaRect.top
      rangeMaxY = maxHeight - padding - areaRect.top - btnH
    }

    rangeMinX = Math.max(0, rangeMinX)
    rangeMinY = Math.max(0, rangeMinY)
    rangeMaxX = Math.min(areaRect.width - btnW, rangeMaxX)
    rangeMaxY = Math.min(areaRect.height - btnH, rangeMaxY)

    const rangeW = rangeMaxX - rangeMinX
    const rangeH = rangeMaxY - rangeMinY
    if (rangeW <= 0 || rangeH <= 0) {
      return { x: Math.max(0, areaRect.width / 2 - btnW / 2), y: Math.max(0, areaRect.height / 2 - btnH / 2) }
    }

    let headLeft = -1e9
    let headTop = -1e9
    let headRight = 1e9
    let headBottom = 1e9
    if (heading) {
      const headRect = heading.getBoundingClientRect()
      headLeft = headRect.left - areaRect.left - 8
      headTop = headRect.top - areaRect.top - 8
      headRight = headRect.right - areaRect.left + 8
      headBottom = headRect.bottom - areaRect.top + 8
    }
    const overlapsHeading = (x: number, y: number) =>
      x + btnW > headLeft && x < headRight && y + btnH > headTop && y < headBottom

    for (let i = 0; i < 60; i++) {
      const x = rangeMinX + Math.random() * rangeW
      const y = rangeMinY + Math.random() * rangeH
      if (distFromYesCenter(x, y) >= MIN_DISTANCE_FROM_YES_CENTER && !overlapsHeading(x, y)) {
        return { x, y }
      }
    }
    const fallbackX = Math.max(rangeMinX, Math.min(rangeMaxX, areaRect.width - btnW - 20))
    const fallbackY = Math.max(rangeMinY, Math.min(rangeMaxY, areaRect.height - btnH - 20))
    return { x: fallbackX, y: fallbackY }
  }, [])

  useEffect(() => {
    const pos = getSafeRandomPosition()
    if (pos) setNoButtonPosition(pos)
  }, [getSafeRandomPosition, windowSize.width, windowSize.height])

  const moveNoButton = useCallback(() => {
    if (gaveUp) return
    const next = getSafeRandomPosition()
    if (next) setNoButtonPosition(next)
    setNoAttempts((c) => {
      const nextCount = c + 1
      if (nextCount >= GIVE_UP_AFTER_ATTEMPTS) setGaveUp(true)
      return nextCount
    })
  }, [gaveUp, getSafeRandomPosition])

  useEffect(() => {
    if (!gaveUp) return
    const area = buttonAreaRef.current
    const yesBtn = yesButtonRef.current
    const noBtn = noButtonRef.current
    if (!area || !yesBtn || !noBtn) return
    const areaRect = area.getBoundingClientRect()
    const yesRect = yesBtn.getBoundingClientRect()
    const noBtnRect = noBtn.getBoundingClientRect()
    const fixedX = Math.max(0, areaRect.width / 2 - noBtnRect.width / 2)
    const belowYes = (yesRect.bottom - areaRect.top) + 20
    const fixedY = Math.max(0, Math.min(areaRect.height - noBtnRect.height - 8, belowYes))
    setNoButtonPosition({ x: fixedX, y: fixedY })
  }, [gaveUp])

  const handleNoHover = () => moveNoButton()

  const handleNoTouch = () => {
    setNoButtonVisible(false)
    moveNoButton()
    setTimeout(() => setNoButtonVisible(true), 150)
  }

  const handleYesClick = () => {
    setSaidYes(true)
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 8000)
  }

  const noMessage = NO_ATTEMPT_MESSAGES[Math.min(noAttempts, NO_ATTEMPT_MESSAGES.length - 1)]

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-stone-50 via-orange-50/30 to-amber-50/50 flex flex-col items-center justify-center px-4 py-12"
    >
      {/* Full-screen confetti when she clicks Yes */}
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          numberOfPieces={400}
          recycle={false}
          colors={['#fdba74', '#fed7aa', '#fec89a', '#fcd34d', '#fde68a', '#fef3c7']}
        />
      )}

      {/* Dudu & Bubu avatars */}
      <div className="flex items-center justify-center gap-6 sm:gap-10 mb-6">
        {DUDU_IMAGE_URL ? (
          <img
            src={DUDU_IMAGE_URL}
            alt="Dudu"
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-orange-200 shadow-md"
          />
        ) : (
          <div
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-orange-200/50 border-2 border-orange-300 border-dashed flex items-center justify-center text-stone-500 text-xs"
            title="Add DUDU_IMAGE_URL"
          >
            Dudu
          </div>
        )}
        <span className="text-2xl text-orange-400">♥</span>
        {BUBU_IMAGE_URL ? (
          <img
            src={BUBU_IMAGE_URL}
            alt="Bubu"
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-orange-200 shadow-md"
          />
        ) : (
          <div
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-amber-200/50 border-2 border-amber-300 border-dashed flex items-center justify-center text-stone-500 text-xs"
            title="Add BUBU_IMAGE_URL"
          >
            Bubu
          </div>
        )}
      </div>

      <div className="text-center max-w-lg mx-auto space-y-6">
        {saidYes ? (
          <>
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="text-3xl sm:text-4xl font-bold text-stone-800"
            >
              Yay! It&apos;s a date! ❤️
            </motion.h1>
            <p className="text-stone-600">See you at {DEFAULT_TIME}!</p>

            {/* Dudu & Bubu celebration GIF */}
            {CELEBRATE_GIF_URL && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="my-6"
              >
                <img
                  src={CELEBRATE_GIF_URL}
                  alt="Dudu & Bubu celebrate"
                  className="mx-auto w-48 h-48 sm:w-56 sm:h-56 rounded-2xl object-cover border-2 border-orange-200 shadow-lg"
                />
              </motion.div>
            )}

            {/* Join our Skribbl.io Room – opens in new tab */}
            <motion.a
              href={SKRIBBL_URL}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="inline-block mt-6 px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-lg shadow-lg shadow-orange-200 hover:shadow-orange-300 transition-all hover:scale-105 active:scale-100 border-2 border-orange-400/50"
            >
              Join our Skribbl.io Room
            </motion.a>
          </>
        ) : (
          <>
            <h1
              ref={headingRef}
              className="text-3xl sm:text-4xl font-semibold text-stone-800"
            >
              Will you go on a date with me?
            </h1>
            <p className="text-stone-600 text-lg">Dudu & Bubu 💕</p>

            {noAttempts > 0 && !gaveUp && (
              <motion.p
                key={noAttempts}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-lg font-medium text-orange-600 min-h-[2rem]"
              >
                {noMessage}
              </motion.p>
            )}

            {gaveUp && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-lg font-medium text-amber-700 min-h-[2rem]"
              >
                Okay fine, you win... but please click Yes! 🙏
              </motion.p>
            )}

            <div
              ref={buttonAreaRef}
              className="relative flex items-center justify-center gap-4 min-h-[140px]"
            >
              <motion.button
                ref={yesButtonRef}
                type="button"
                onClick={handleYesClick}
                className="relative z-10 animate-heartbeat px-10 py-5 rounded-full bg-gradient-to-r from-orange-400 to-amber-500 hover:from-orange-500 hover:to-amber-600 text-white font-semibold text-xl shadow-lg shadow-orange-200 hover:shadow-orange-300 transition-shadow"
              >
                Yes
              </motion.button>

              <motion.button
                ref={noButtonRef}
                type="button"
                onMouseEnter={handleNoHover}
                onTouchStart={handleNoTouch}
                className={`absolute px-8 py-4 rounded-full bg-stone-300 hover:bg-stone-400 text-stone-600 font-medium text-lg select-none cursor-default z-[100] ${
                  noButtonVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
                } ${gaveUp ? 'cursor-pointer' : ''} animate-bounce-pop`}
                initial={false}
                animate={{
                  left: noButtonPosition.x,
                  top: noButtonPosition.y,
                  scale: 1,
                }}
                transition={{ type: 'spring', stiffness: 380, damping: 22 }}
                whileHover={{ scale: gaveUp ? 1.02 : 0.88 }}
              >
                No
              </motion.button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
