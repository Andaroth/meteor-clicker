import React, { useState, useRef } from "react";

export const AndaAudio = () => {
  const domElem = useRef()
  const [isPlaying, setIsPlaying] = useState(false)
  const handleToggleMusic = () => {
    if (domElem.current) {
      if (domElem.current.paused) {
        domElem.current.volume = 0.25
        domElem.current.loop = true
        domElem.current.play()
      }
      else domElem.current.pause()
      requestAnimationFrame(() => setIsPlaying(!domElem.current.paused))
    }
  }

  return <>
    <audio
      ref={domElem} id="Rickroll_8bit_by_AstrDynamite"
      loop
      src="./ricky AstrDynamite.mp3"
      className="hidden"
      onPlay={() => setIsPlaying(true)}
    ></audio>
    <button
      className="flex fixed bottom-4 right-20 z-5 justify-center h-[56px] w-[56px] rounded-[50%] shadow bg-white cursor-pointer"
      onClick={handleToggleMusic}
    >
      <div className="flex flex-col h-full justify-center select-none text-3xl">
        <div className={ isPlaying ? "text-blue-700" : "text-gray-600"}>{ isPlaying ? "🔇" : "🔈"}</div>
      </div>
    </button>
  </>
}