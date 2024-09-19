import React from 'react';
import { Count } from './Count.jsx';
import { AndaCursor } from './AndaCursor.jsx';

export const App = () => (
  <div
    className="bg-black text-white text-center flex flex-col justify-center h-[100dvh] overflow-hidden"
  >
    <h1 className="text-lg md:text-4xl text-nowrap">&lt;AndaClicker&nbsp;/&gt;</h1>
    <Count/>
    <div className="flex justify-center">
      <p className="flex flex-col md:flex-row gap-2 mt-4">
        <a href="https://github.com/Andaroth/meteor-clicker" target="_blank">Open on github</a>
        <span className="text-gray-600">or</span>
        <a href="https://andapirate.com" target="_blank">Visit my website lmao</a>
      </p>
    </div>
    <AndaCursor />
  </div>
);
