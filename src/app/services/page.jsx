'use client'
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { CardWithForm } from "../components/card";
import { CardDisplay } from "../components/cardDisplay";



export default function Services() {
    const { data: session } = useSession();
    const [cards, setCards] = useState([]);

    // Récupérer les cartes depuis l'API
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
    }, []); // Lancer l'effet une seule fois au montage

    return (
        <>
            {/* Si l'utilisateur est admin, afficher le formulaire pour ajouter des cartes */}
            {session?.user.role === "admin" && (
                <CardWithForm cards={cards} setCards={setCards} />
            )}

            {/* Affichage des cartes (toujours visible, même pour les visiteurs) */}

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 ">
                {Array.isArray(cards) && cards.length > 0 ? (
                    cards.map((card) => (
                        <div className="w-full px-4" key={card.id}>
                            <CardDisplay card={card} setCards={setCards} />
                        </div>
                    ))
                ) : (
                    <p>Aucune carte à afficher.</p>
                )}
            </div>

        </>
    );
}
