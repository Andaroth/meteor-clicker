import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';

import cn from "classnames"

import { useFind, useSubscribe } from 'meteor/react-meteor-data';
import { ClicksCollection } from '../api/clicks';

export const Count = () => {
  const [cooldown, setCooldown] = useState(false)
  const loading = useSubscribe('clicks');
  const clicks = useFind(() => ClicksCollection.find());

  const increment = () => {
    setCooldown(true)
    try  {
      Meteor.call('clicked')
    } catch (e) {
      console.log(e)
    } finally {
      setTimeout(() => setCooldown(false), 500)
    }
  };
  
  const isLoading = () => loading() || cooldown

  return (
    <div className="my-16">
      <button
        className={cn(
          "mb-4 border-2 p-4 rounded-lg",
          !isLoading() ? "border-[#0F0] hover:bg-[#0F0] hover:text-black active:scale-90" : "border-gray-600"
        )}
        onClick={increment}
        disabled={isLoading()}
      >{ !loading() ? (cooldown ? "Please wait ..." : "Pointless button") : "Loading..."}</button>
      <p>Internet pressed this button {!loading() ? clicks.length : "a certain amount of"} times.</p>
    </div>
  );
};
