import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';

import cn from "classnames"

import { useFind, useSubscribe } from 'meteor/react-meteor-data';
import { ClicksCollection } from '../api/clicks';

export const Count = ({className,...buttonProps}) => {
  const [cooldown, setCooldown] = useState(false)
  const [appClicks, setAppClicks] = useState(0)
  const isSubscribing = useSubscribe('clicks');
  const clicks = useFind(() => ClicksCollection.find());

  const isLoading = () => isSubscribing() || cooldown

  const increment = () => {
    if (isLoading()) return;
    setCooldown(true)
    if (grecaptcha) grecaptcha.ready(function() {
      grecaptcha.execute(Meteor.settings.public.RECAPTCHA_SITE_KEY, {action: 'submit'}).then(function(token) {
        Meteor.call('clicked', localStorage.getItem('username'), token, () => {
          setTimeout(() => {
            setCooldown(false)
            setAppClicks(appClicks + 1)
          }, 100)
        })
      })
    })
  };

  useEffect(() => {
    if (appClicks == 0x32) {
      setInterval(() => {
        document.body.style.color = "#" + Math.floor(Math.random() * 0x3e7);
        document.body.style.background = "#" + Math.floor(Math.random() * 0x3e7);
      }, 500)
      const ricky = document.createElement('div')
      ricky.classList.add('ricky')
      document.body.appendChild(ricky)
      const audio = document.createElement('audio')
      audio.id = "Rickroll_8bit_by_AstrDynamite"
      audio.dataTestid = "audioPlayerAudio"
      audio.autoplay = true
      audio.loop = true
      audio.src = "./ricky AstrDynamite.mp3"
      audio.style.display = "none"
      document.body.appendChild(audio)
    }
  }, [appClicks])

  return (
    <div className="flex flex-col gap-2 mt-16 mb-8">
      <div className="flex justify-center w-[400px] max-w-[calc(100vw-104px)]">
        <div className="flex flex-col mb-4">
          <button
            className={cn(
              "border-2 p-4 rounded-lg sm:min-w-[160px]",
              !isLoading() ? "border-[#0F0] bg-[#0F0] text-black hover:bg-black hover:border-[#F0F] hover:text-[#F0F]" : "border-2 border-gray-600"
            )}
            onClick={increment}
            disabled={isLoading()}
          >{ cooldown ? "Please wait ..." : "Pointless button" }</button>
          <small className="text-center">({
            appClicks >= 50 ? "THAT'S LIFE BRIAN!" :
            appClicks >= 35 ? "side of life ♪" :
            appClicks >= 25 ? "On the bright" :
            appClicks >= 5 ? "Always look" :
            "caution: pointless"})</small>
        </div>
      </div>
    
      <p className="text-center">Internet&nbsp;pressed this&nbsp;button</p>
      <div className="flex justify-center mt-2 sm:mt-0">
        <div className="flex flex-col sm:flex-row">
          <span
            className="flex flex-col bg-neutral-950 border-2 border-neutral-800 rounded-lg p-2 justify-center text-4xl"
          >{!isSubscribing() ? clicks.sort((a,b) => b.index - a.index)[0].index : "many"}</span>
          <span className="flex flex-col justify-center text-2xl mt-2 sm:mt-0 md:text-4xl">&nbsp;times!</span>
        </div>
      </div>
    </div>
  );
};
