'use client'
import { useState } from 'react';
import { Sidebar } from './components/sidebar';
import { PasswordList } from './components/PasswordList';
import { PasswordValidator } from './components/PasswordValidator';


export default function Home() {

  const [validated, setValidated] = useState(new Date);

  return (
    <main className="flex flex-col">
      <nav className="bg-white border-b border-gray-200 fixed z-30 w-full">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <button id="toggleSidebarMobile" aria-expanded="true" aria-controls="sidebar" className="lg:hidden mr-2 text-gray-600 hover:text-gray-900 cursor-pointer p-2 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 rounded">
                <svg id="toggleSidebarMobileHamburger" className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                <svg id="toggleSidebarMobileClose" className="w-6 h-6 hidden" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
              </button>
              <a href="https://www.ippopay.com" className="text-xl font-bold flex items-center lg:ml-2.5 py-2">
                <img src="https://www.ippopay.com/_next/static/media/logo_ippopay_logo.68c65e9b.svg" className="h-6 mr-2" alt="Windster Logo" />
              </a>
            </div>
            <div>
              <a href='https://github.com/praem90/nodejs-task-ippopay' className='flex' target='blank'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                &nbsp;Github
              </a>
            </div>
          </div>
        </div>
      </nav>
      <div className='flex w-full h-screen pt-16'>

        <Sidebar />
        <div className='w-full'>
          <div className="p-4 bg-white block sm:flex items-center flex-col justify-between border-b border-gray-200 lg:mt-1.5">
            <div className="mb-1 w-full pb-3 border-b">
              <div className="mb-4">
                <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Validate your password</h1>
              </div>
              <PasswordValidator onValidate={() => setValidated(new Date)} />
            </div>
            <PasswordList validated={validated} />
          </div>
        </div>
      </div>
    </main>
  )
}
