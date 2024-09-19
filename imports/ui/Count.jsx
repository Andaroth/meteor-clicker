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
    <div className="my-16">
      <button
        className={cn(
          "border-2 mb-4 p-4 rounded-lg sm:min-w-[160px]",
          !isLoading() ? "border-[#0F0] bg-[#0F0] text-black hover:bg-black hover:border-[#F0F] hover:text-[#F0F]" : "border-2 border-gray-600"
        )}
        onClick={increment}
        disabled={isLoading()}
      >{ cooldown ? "Please wait ..." : "Pointless button" }</button>
      <p>Internet&nbsp;pressed this&nbsp;button <br/><span className="text-6xl md:text-4xl">{!isStarting() ? clicks[0].index : "many"}</span><br className="block md:hidden" /><span className="text-2xl md:text-4xl">&nbsp;times!</span></p>
    </div>
  );
};
