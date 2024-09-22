import React, { useEffect } from 'react';
import { CountComponent } from './CountComponent.jsx';
import { ChatComponent } from './ChatComponent.jsx';
import { AndaCursor } from './AndaCursor.jsx';

export const App = () => {
  useEffect(() => {
    if (!localStorage.getItem('username')) localStorage.setItem('username', faker.person.firstName())
  }, [])

  return <>
    <div className="flex flex-col h-[100dvh] overflow-y-auto">
      <div className="flex flex-col md:flex-row gap-2 justify-center p-4 md:max-h-[calc(100dvh-56px)]">
        <CountComponent />
        <ChatComponent />
      </div>
      <div className="flex justify-center">
        <p className="flex flex-col md:flex-row gap-2 my-4 text-center">
          <a href="https://github.com/Andaroth/meteor-clicker" target="_blank">Open on github</a>
          <span className="text-gray-600">or</span>
          <a href="https://andapirate.com" target="_blank">Visit my website</a>
        </p>
      </div>
    </div>
    <AndaCursor />
  </>
};
