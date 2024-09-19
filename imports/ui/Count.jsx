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
          "mb-4 border-2 p-4 rounded-lg",
          !isLoading() ? "border-[#0F0] hover:bg-[#0F0] hover:text-black active:scale-90" : "border-gray-600"
        )}
        onClick={increment}
        disabled={isLoading()}
      >{ !isStarting() ? (cooldown ? "Please wait ..." : "Pointless button") : "Loading..."}</button>
      <p>Internet pressed this button <br/><span className="text-4xl">{!isStarting() ? clicks.length : "many"}&nbsp;times!</span></p>
    </div>
  );
};
