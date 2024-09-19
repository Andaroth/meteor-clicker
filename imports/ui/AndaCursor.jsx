import React, { useEffect, useState } from "react"
import cn from "classnames"

import { isMobile } from "react-device-detect"

export const AndaCursor = () => {
  const [hover, setHover] = useState(false)
  const [moved, setMoved] = useState(false)
  const [visible, setVisible] = useState(false)

  const [x, setX] = useState(0)
  const [y, setY] = useState(0)

  const [crossColor, setCrossColor] = useState("#0F0")

  useEffect(() => {
    const setXY = ({ target, pageX, pageY }) => {
      setMoved(true)
      if (target?.tagName === 'A'
        || target?.tagName === 'INPUT'
        || target?.tagName === 'BUTTON'
        || target?.parentNode?.tagName === 'A'
        || target?.parentNode?.parentNode?.tagName === 'A'
        || target?.classList?.contains('cursor-pointer')
        || target?.parentNode?.classList?.contains('cursor-pointer')
        || target?.parentNode?.parentNode?.classList?.contains('cursor-pointer')
      ) {
        setHover(true)
        setCrossColor("#F0F")
      } else {
        setHover(false)
        setCrossColor("#0F0")
      }
      setTimeout(() => {
        setX(pageX)
        setY(pageY)
      })
    }

    if (!isMobile) window.addEventListener('mousemove', setXY, { passive: true })
    return () => window.removeEventListener('mousemove', setXY)
  }, [])

  useEffect(() => {
    setVisible(!isMobile)
  }, [])

  return visible ? <div className="customCursor fixed pointer-events-none z-50" style={{ left: x + "px", top: y + "px" }}>
    <div className={cn("hBar w-[20px] pointer-events-none relative", moved ? 'opacity-1' : 'opacity-0', hover ? 'h-[3px] -left-[9px]' : `h-[1px] -left-[10px]`)} style={{ backgroundColor: crossColor, transition: 'all .2 ease-out', zIndex: 150 }} />
    <div className={cn("vBar h-[20px] pointer-events-none relative", moved ? 'opacity-1' : 'opacity-0', hover ? 'w-[3px] -top-[11px]' : `w-[1px] -top-[10px]`)} style={{ backgroundColor: crossColor, transition: 'all .2 ease-out', zIndex: 150 }} />
    <div className={cn("relative pointer-events-none", `text-[11px] left-[4px] -top-[20px]`, moved ? 'opacity-1' : 'opacity-0')} style={{ color: crossColor}}>x/{x}<br />y/{y}</div>
    <style>{` * { cursor: none !important; } div.customCursor { z-index: 256; }`}</style>
  </div > : ''
}