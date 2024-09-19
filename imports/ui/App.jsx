import React from 'react';
import { Count } from './Count.jsx';
import { AndaCursor } from './AndaCursor.jsx';

export const App = () => (
  <div
    className="bg-black text-white text-center flex flex-col justify-center h-[100dvh] overflow-hidden"
  >
    <h1 className="text-lg md:text-4xl">Pointless<span className="hidden"> page XD</span></h1>
    <Count/>
    <div className="flex justify-center">
      <p className="flex flex-col gap-2 mt-4">
        <a href="https://github.com/Andaroth/meteor-clicker" target="_blank">See this project's code</a>
        <span className="text-gray-600">or</span>
        <a href="https://andapirate.com" target="_blank">Visit my website lmao</a>
      </p>
    </div>
    <AndaCursor />
  </div>
);
