"use client"; // Ajoute ceci si tu es dans l'App Router (dossier `app/`)

import Link from "next/link";
import { Lock } from 'lucide-react';
import { LockOpen } from 'lucide-react';
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { Nav } from "./burger";

export default function Header() {
    const { data: session } = useSession();

    return (
        <header className="flex flex-row justify-between items-center h-24 bg-maincolor text-white pt-8  h-12">
            <a href="/home">
                <h1 className=" mx-6">TECH REPAIR</h1>
            </a>
            <nav>

                <ul className="flex flex-row gap-20 mx-8 hidden lg:flex">
                    <li><Link href="/home">Accueil</Link></li>
                    <li><Link href="/services">Services</Link></li>
                    {/* <li><Link href="/services">Tarifs</Link></li> */}
                    <li><Link href="/contact">Contact</Link></li>
                    <li>  {!session ? (
                        <button className="flex items-center gap-2" onClick={() => (window.location.href = "/adminlog")}>Login<Lock className="h4 w-4" /></button>
                    ) : (
                        <button className="flex items-center gap-2" onClick={() => signOut()}>Logout<LockOpen className="h4 w-4" /></button>
                    )}</li>
                </ul>
                <div className="mr-6 lg:hidden">

                    <Nav />
                </div>
            </nav>
        </header>
    );
}
