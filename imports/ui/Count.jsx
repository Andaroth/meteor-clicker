import React, { useState } from 'react';

import { useFind, useSubscribe } from 'meteor/react-meteor-data';
import { ClicksCollection } from '../api/clicks';

export const Count = () => {
  const loading = useSubscribe('clicks');
  const clicks = useFind(() => ClicksCollection.find());

  const increment = () => {
    ClicksCollection.insertAsync({})
  };
  

  return (
    <div>
      <button onClick={increment}>Bouton inutile</button>
      <p>Internet a appuyé {!loading() ? clicks.length : "?"} fois sur ce bouton inutile.</p>
    </div>
  );
};
