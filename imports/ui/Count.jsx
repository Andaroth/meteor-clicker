import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';

import cn from "classnames"

import { useFind, useSubscribe } from 'meteor/react-meteor-data';
import { ClicksCollection } from '../api/clicks';

export const Count = ({className,...buttonProps}) => {
  const [cooldown, setCooldown] = useState(false)
  const [appClicks, setAppClicks] = useState(0)
  const isStarting = useSubscribe('clicks');
  const clicks = useFind(() => ClicksCollection.find());

  const isLoading = () => isStarting() || cooldown

  const increment = () => {
    if (isLoading()) return;
    setCooldown(true)
    Meteor.call('clicked', () => {
      setTimeout(() => {
        setCooldown(false)
        setAppClicks(appClicks + 1)
      }, 100)
    })
  };

  useEffect(() => {
    if (appClicks == 0x64) {
      setInterval(() => {
        document.body.style.color = "#" + Math.floor(Math.random() * 0x3e7);
        document.body.style.background = "#" + Math.floor(Math.random() * 0x3e7);
      }, 500)
      const frame = document.createElement('iframe')
      frame.src = "https://www.youtube.com/embed/oHg5SJYRHA0?si=nxuztyLhoGvTdJ_V&amp;controls=0&autoplay=1"
      frame.title = "The game"
      frame.frameborder = 0
      frame.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      frame.referrerPolicy = "strict-origin-when-cross-origin"
      frame.allowfullscreen = true
      frame.style.position = "fixed"
      frame.style.width = "100vw"
      frame.style.height = "100dvh"
      frame.style.top = 0
      frame.style.left = 0
      frame.style.zIndex = -10
      frame.classList.add = "md:scale-[1.5]"
      document.body.appendChild(frame)
    }
  }, [appClicks])

  return (
    <div className="flex flex-col gap-2 my-16">
      <div className="flex justify-center">
        <div className="flex flex-col mb-4">
          <button
            className={cn(
              "border-2 p-4 rounded-lg sm:min-w-[160px]",
              !isLoading() ? "border-[#0F0] bg-[#0F0] text-black hover:bg-black hover:border-[#F0F] hover:text-[#F0F]" : "border-2 border-gray-600"
            )}
            onClick={increment}
            disabled={isLoading()}
          >{ cooldown ? "Please wait ..." : "Pointless button" }</button>
          <small>({
            appClicks >= 100 ? "THAT'S LIFE BRYAN!" :
            appClicks >= 75 ? "side of life ♪" :
            appClicks >= 50 ? "On the bright" :
            appClicks >= 25 ? "Always look" :
            "caution: pointless"})</small>
        </div>
      </div>
    
      <p>Internet&nbsp;pressed this&nbsp;button</p>
      <div className="flex justify-center mt-2 sm:mt-0">
        <div className="flex flex-col sm:flex-row">
          <span
            className="flex flex-col bg-neutral-950 border-2 border-neutral-800 rounded-lg p-2 justify-center text-4xl"
          >{!isStarting() ? clicks[0].index : "many"}</span>
          <span className="flex flex-col justify-center text-2xl mt-2 sm:mt-0 md:text-4xl">&nbsp;times!</span>
        </div>
      </div>
    </div>
  );
};
