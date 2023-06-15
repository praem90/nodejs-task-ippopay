import { useState } from "react";

export const PasswordValidator = ({onValidate}) => {
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);
  
    const validate = async (e: any) => {
      e.preventDefault();
      setMessage('');
      setSuccess(false);
      const res = await fetch('/api/password', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ password })
      });
  
  
      setSuccess(res.ok);
      const response = await res.json()
      setMessage(response.message)
      onValidate && onValidate();
    }

    return (
        <form className="lg:pr-3" action="#" method="GET">
            <div className="flex items-center">
            <label htmlFor="password" className="sr-only">Password</label>
            <div className="mt-1 relative lg:w-64 xl:w-96">
                <input 
                    type="text" 
                    id="password" 
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" 
                    placeholder="Pasword" 
                    onChange={e => setPassword(e.target.value)}
                    name="password" />
            </div>
            <button 
                onClick={validate}
                className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center justify-center rounded-lg text-sm px-3 py-2.5 ml-3 text-center"
            >Validate</button>
            </div>
            <p className={success ? 'text-green-700' : 'text-red-700'}>{message}</p>
        </form>
    );
}