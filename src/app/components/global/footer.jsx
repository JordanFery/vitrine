import { Instagram } from 'lucide-react';
import { Facebook } from 'lucide-react';
import { Linkedin } from 'lucide-react';
import { MapPin } from 'lucide-react';
import { Phone } from 'lucide-react';
import { Mail } from 'lucide-react';



export default function Footer() {

    return (
        <footer className="bg-maincolor text-white items-center pl-8 mt-16">
            <h1 className="text-4xl pt-8 sm:pb-8">TECHREPAIR</h1>
            <section className="sm:pt-8 grid grid-cols-1 sm:grid-cols-3">

                <div className='flex flex-col '>
                    <p className='sm:pb-16 pb-8 w-1/2 pt-12 lg:pt-0'>Réparation rapide & fiable de vos appareils électroniques.</p>
                    <p>Suivez nous sur nos réseaux !</p>
                    <div className='pt-8 flex flex-row justify-between w-1/4 text-button'>
                        <Facebook /><Linkedin /><Instagram />
                    </div>
                </div>
                <div className='flex flex-col pt-12 lg:pt-0'>
                    <h3 className='mb-10 text-button'>Menu</h3>
                    <a href="/home" className='mt-2'>Accueil</a>
                    <a href="/services" className='mt-3'>Services</a>
                    <a href="/home#ancre" className='mt-3'>Tarifs</a>
                    <a href="/home#qsn" className='mt-3'>Qui sommes-nous ?</a>
                </div>
                <div className='flex flex-col px-2 sm:px-0'>
                    <h3 className='pb-10 flex  text-button pt-12 lg:pt-0'>Contactez-nous </h3>
                    <div className='flex flex-row'>
                        <MapPin />
                        <p className=' pl-4 pb-4 blur-sm'>  1234 rue République  75011 Paris, France</p>
                    </div>
                    <div className='flex flex-row'>
                        <Phone />
                        <p className=' pl-4 pb-4 blur-sm'>
                            01 99 00 00 02</p>

                    </div>

                    <div className='flex flex-row'>
                        <Mail />
                        <p className='pl-4 blur-sm'>  contact@techrepair.com</p>
                    </div>
                </div>
            </section>
            <p className='text-center py-8'>© 2025 Tech Repair - Tous droits réservés.</p>
        </footer>


    )
}
