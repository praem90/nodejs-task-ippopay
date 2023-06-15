'use client'
import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { PasswordList } from './components/PasswordList';
import { PasswordValidator } from './components/PasswordValidator';


export default function Home() {

  const [validated, setValidated] = useState(new Date);

  return (
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
  )
}
