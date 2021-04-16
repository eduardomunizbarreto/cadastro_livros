import React from 'react';

const Header: React.FC = () => {
    return (
        <nav className="bg-gray-800">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16">

                    <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex-shrink-0 flex items-center">
                            <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="Workflow" />
                            <span className="ml-2 text-white font-bold text-xl">BOOK STORE</span>
                        </div>

                    </div>
                </div>
            </div>


        </nav>
    )
}

export default Header;