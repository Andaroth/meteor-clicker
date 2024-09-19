import React from 'react';
import { Meteor } from 'meteor/meteor';

import { useFind, useSubscribe } from 'meteor/react-meteor-data';
import { ClicksCollection } from '../api/clicks';

export const Count = () => {
  const loading = useSubscribe('clicks');
  const clicks = useFind(() => ClicksCollection.find());

  const increment = () => {
    console.log('increment')
    Meteor.call('clicked')
  };
  

  return (
    <div className="my-16">
      <button
        className="mb-4 border-2 border-[#0F0] p-4 rounded-lg hover:bg-[#0F0] hover:text-black active:scale-90"
        onClick={increment}
        disabled={loading()}
      >{ !loading() ? "Bouton inutile" : "Chargement..."}</button>
      <p>Internet a appuyé {!loading() ? clicks.length : "?"} fois sur ce bouton inutile.</p>
    </div>
  );
};
