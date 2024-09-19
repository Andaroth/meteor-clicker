import React from 'react';
import { Count } from './Count.jsx';
import { AndaCursor } from './AndaCursor.jsx';

export const App = () => (
  <div
    className="bg-black text-white text-center flex flex-col justify-center h-[100dvh] overflow-hidden"
  >
    <h1 className="text-lg md:text-4xl">Pointless</h1>
    <Count/>
    <p className="mt-4">
      <a className="text-[#0f0] cursor-pointer hover:underline" href="https://andapirate.com">Visit my wesite lmao</a>
    </p>
    <AndaCursor />
  </div>
);
