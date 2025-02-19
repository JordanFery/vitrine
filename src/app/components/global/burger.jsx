"use client"
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Lock } from 'lucide-react';
import { LockOpen } from 'lucide-react';
import { signOut } from 'next-auth/react';

export function Nav() {
    const [isOpen, setIsOpen] = useState(false);
    const { data: session } = useSession();


    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative -24">
            <button onClick={handleClick} className="flex flex-col justify-center items-center" aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}>
                <span
                    className={`bg-white block transition-all duration-300 ease-out 
                      h-0.5 w-6 mb-2  rounded-sm ${isOpen ? 'rotate-45 translate-y-3' : '-translate-y-0.5'}`}
                ></span>
                <span
                    className={`bg-white block transition-all duration-300 ease-out 
                      h-0.5 w-6 mb-2 rounded-sm ${isOpen ? 'opacity-0' : 'opacity-100'}`}
                ></span>
                <span
                    className={`bg-white block transition-all duration-300 ease-out 
                      h-0.5 w-6 rounded-sm ${isOpen ? '-rotate-45 -translate-y-3' : 'translate-y-0.5'}`}
                ></span>
            </button>

            {/* Menu de liens */}
            <div
                className={`absolute  -right-4 bg-maincolor p-4 rounded-lg shadow-lg transition-all duration-300 
                    ${isOpen ? 'block' : 'hidden'} lg:hidden`}
            >
                <a href="home" className="block text-white py-2 px-4 hover:text-buttonHover">
                    Accueil
                </a>
                <a href="services" className="block text-white py-2 px-4 hover:text-buttonHover">
                    Services                </a>
                <a href="contact" className="block text-white py-2 px-4 hover:text-buttonHover">
                    Contact
                </a>
                <div className='pl-3 pt-4'>

                    {!session ? (
                        <button className='flex items-center gap-2' onClick={() => (window.location.href = "/adminlog")}>Logout<Lock className="h4 w-4" /></button>
                    ) : (
                        <button className='flex items-center gap-2' onClick={() => signOut()}>Login<LockOpen className="h4 w-4" /></button>
                    )}
                </div>

            </div>
        </div>
    );
}
