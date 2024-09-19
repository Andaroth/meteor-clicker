import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';

import cn from "classnames"

import { useFind, useSubscribe } from 'meteor/react-meteor-data';
import { ClicksCollection } from '../api/clicks';

export const Count = () => {
  const [cooldown, setCooldown] = useState(false)
  const isStarting = useSubscribe('clicks');
  const clicks = useFind(() => ClicksCollection.find());

  const isLoading = () => isStarting() || cooldown

  const increment = () => {
    if (isLoading()) return;
    setCooldown(true)
    Meteor.call('clicked', () => {
      setTimeout(() => setCooldown(false), 100)
    })
  };

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
          <small>(caution: pointless)</small>
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
