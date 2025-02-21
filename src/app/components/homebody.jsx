"use client"
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Modal from "./modale";
import { useState, useEffect } from "react";
import { CardDisplay } from "../components/cardDisplay";


export default function HomeBody() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const [cards, setCards] = useState([]);


    useEffect(() => {
        const fetchCards = async () => {
            try {
                const response = await fetch('/api/cards');
                const data = await response.json();
                setCards(data);
            } catch (error) {
            }
        };

        fetchCards();
    }, []);
    return (
        <>
            <div className=" bg-maincolor text-white flex flex-row w-screen pt-16 ">
                <div className="flex flex-col w-full">

                    <h1 className="text-4xl font-bold pt-24 px-6 sm:w-1/2">Réparation Express, Qualité Garantie!</h1>
                    <p className="text-lg sm:w-1/2 mt-8 pl-6 pr-14">Votre smartphone ou ordinateur a un souci ? Nos experts réparent vos appareils rapidement avec des pièces de qualité.</p>
                    <Button onClick={openModal} className="bg-cta rounded-full hover:bg-cta ml-6 h-12 my-12 w-1/2 sm:w-1/6">Prendre RDV</Button>
                    <Modal isOpen={isModalOpen} onClose={closeModal}>
                        <h2 className="text-lg font-semibold text-blue-500">Oups... Pas cette fois !</h2>
                        <p>Alors, je vais être honnête avec toi… cette fonctionnalité est en pause, parce que ce site n'est qu'un petit projet fictif ! Mais si tu veux rêver un peu, imagine que ça marche 😉.</p>
                        <button onClick={closeModal} className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md">
                            Fermer
                        </button>
                    </Modal>
                </div>
                <Image
                    src="/images/Fichier 1.png"
                    height={800}
                    width={1200}
                    alt="image d'accueil"
                    className="mr-6 hidden lg:block object-contain"
                />

            </div>
            <section className="pb-16 px-8">
                <h2 className="text-center text-maincolor text-3xl font-bold py-16">Nos Services</h2>
                <div className="flex flex-row justify-center gap-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                        {Array.isArray(cards) && cards.length > 0 ? (
                            cards.slice(0, 3).map((card) => (
                                <div className="w-full px-4" key={card.id}>
                                    <CardDisplay card={card} setCards={setCards} />
                                </div>
                            ))
                        ) : (
                            <p>Aucune carte à afficher.</p>
                        )}
                    </div>


                </div>
                <div className="flex justify-center">
                    <a href="/services">
                        <Button className="bg-white text-maincolor hover:bg-maincolor hover:border-white hover-border border border-maincolor hover:text-white rounded-full my-16 h-12">Découvrir tous nos services</Button>
                    </a>
                </div>
            </section >
            <section id="qsn" className="bg-maincolor text-white text-center text-xl px-8 sm:px-24 pt-24">
                <p>Chez <span className="font-bold">
                    Techrepair
                </span>
                    , notre mission est de redonner vie à vos appareils. Diagnostics précis, réparations rapides et conseils experts : nous vous aidons à prolonger la durée de vie de votre matériel numérique. </p>

                {/* Redirection vers mon portfolio */}
                <Button className="bg-maincolor text-white hover:bg-white hover:border-white hover-border border hover:text-maincolor rounded-full w-48 my-16 h-12">En savoir plus</Button>
            </section>
            {/* Redirection vers mon portfolio */}


            <section className="pb-16" id="ancre">
                <h2 className="text-center text-maincolor text-3xl font-bold py-16">Nos tarfis</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 px-6 gap-4">

                    <div className=" border-black hover:border-button xl:col-start-2 border rounded-xl ">
                        <p className="text-maincolor p-8">A partir de</p>
                        <p className="text-6xl text-maincolor text-center ">19<span className="text-3xl">€</span></p>
                        <h3 className="font-bold text-center py-8">Diagnostic & Optimisation</h3>
                        <p className="px-4">Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur </p>
                        <div className="flex justify-center">
                            <Button onClick={openModal} className="bg-cta rounded-full w-2/3 h-12 my-16 hover:bg-maincolor">Faire un diagnostic</Button>
                            <Modal isOpen={isModalOpen} onClose={closeModal}>
                                <h2 className="text-lg font-semibold text-blue-500">Oups... Pas cette fois !</h2>
                                <p>Alors, je vais être honnête avec toi… cette fonctionnalité est en pause, parce que ce site n'est qu'un petit projet fictif ! Mais si tu veux rêver un peu, imagine que ça marche 😉.</p>
                                <button onClick={closeModal} className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md">
                                    Fermer
                                </button>
                            </Modal>
                        </div>

                    </div>
                    <div className=" border-black hover:border-button border rounded-xl flex flex-col">
                        <p className="text-maincolor p-8">A partir de</p>
                        <p className="text-6xl text-maincolor text-center ">29<span className="text-3xl">€</span></p>
                        <h3 className="font-bold text-center py-8"> Réparation Express</h3>
                        <p className="px-4">Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur </p>
                        <div className="flex justify-center">


                            <Button onClick={openModal} className="bg-cta rounded-full w-2/3 h-12 my-16 hover:bg-maincolor">Réparer mon appareil</Button>
                            <Modal isOpen={isModalOpen} onClose={closeModal}>
                                <h2 className="text-lg font-semibold text-blue-500">Oups... Pas cette fois !</h2>
                                <p>Alors, je vais être honnête avec toi… cette fonctionnalité est en pause, parce que ce site n'est qu'un petit projet fictif ! Mais si tu veux rêver un peu, imagine que ça marche 😉.</p>
                                <button onClick={closeModal} className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md">
                                    Fermer
                                </button>
                            </Modal>
                        </div>

                    </div>
                    <div className=" border-black hover:border-button border rounded-xl flex flex-col">
                        <p className="text-maincolor p-8">A partir de</p>
                        <p className="text-6xl text-maincolor text-center ">49<span className="text-3xl">€</span></p>
                        <h3 className="font-bold text-center py-8">Récupération de Données</h3>
                        <p className="px-4">Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur </p>
                        <div className="flex justify-center">

                            <Button onClick={openModal} className="bg-cta rounded-full flex w-2/3 h-12  my-16 hover:bg-maincolor">Récupérer mes données</Button>
                            <Modal isOpen={isModalOpen} onClose={closeModal}>
                                <h2 className="text-lg font-semibold text-blue-500">Oups... Pas cette fois !</h2>
                                <p>Alors, je vais être honnête avec toi… cette fonctionnalité est en pause, parce que ce site n'est qu'un petit projet fictif ! Mais si tu veux rêver un peu, imagine que ça marche 😉.</p>
                                <button onClick={closeModal} className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md">
                                    Fermer
                                </button>
                            </Modal>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

