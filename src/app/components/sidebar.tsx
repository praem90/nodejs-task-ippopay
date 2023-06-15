export const Sidebar = () => {
    return (

        <aside id="sidebar" className="hidden z-20 h-full top-0 left-0 flex lg:flex flex-shrink-0 flex-col w-64 transition-width duration-75" aria-label="Sidebar">
            <div className="relative flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white pt-0">
                <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                    <div className="flex-1 px-3 bg-white divide-y space-y-1">
                        <ul className="space-y-2 pb-2">
                            <li>
                                <a href="#" className="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 bg-gray-100 group">
                                    <svg className="w-6 h-6 group-hover:text-gray-900 transition duration-75" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
                                    <span className="ml-3">Password Validator</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </aside>
    )
}