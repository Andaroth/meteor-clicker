import React, { useEffect } from 'react';

import { faker } from '@faker-js/faker';

import { CountComponent } from './CountComponent.jsx';
import { ChatComponent } from './ChatComponent.jsx';
import { AndaAudio } from './AndaAudio.jsx';
import { AndaCursor } from './AndaCursor.jsx';

export const App = () => {
  useEffect(() => {
    if (!localStorage.getItem('username')) localStorage.setItem('username', faker.person.firstName())
  }, [])

  return <>
    <div className="flex flex-col h-[100dvh] overflow-y-auto">
      <main className="flex flex-col md:flex-row gap-2 justify-center p-4 md:max-h-[calc(100dvh-56px)]">
        <CountComponent />
        <ChatComponent />
      </main>
      <footer className="flex ml-4 sm:ml-0 justify-start sm:justify-center">
        <nav className="flex flex-col md:flex-row gap-2 my-4 sm:text-center">
          <a href="https://github.com/Andaroth/meteor-clicker" target="_blank">Open on github</a>
          <aside className="text-gray-600">or</aside>
          <a href="https://andapirate.com" target="_blank">Visit my website</a>
        </nav>
      </footer>
    </div>
    <div className="ricky" />
    <AndaCursor />
    <AndaAudio />
  </>
};
