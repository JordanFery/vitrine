import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function CardDisplay({ card, setCards }) {
    const { data: session } = useSession();
    const [isDelete, setIsDelete] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [updatedTitle, setUpdatedTitle] = useState(card.title);
    const [updatedDescription, setUpdatedDescription] = useState(card.description);
    const [updatedImage, setUpdatedImage] = useState(card.image);


    if (!card || !card.title) {
        return <p>Donnée invalide ou carte vide.</p>;
    }

    const handleUpdate = async () => {
        try {
            const response = await fetch(`/api/cards`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: card.id,
                    title: updatedTitle,
                    description: updatedDescription,
                    image: updatedImage,
                }),
            });

            if (response.ok) {
                const updatedCard = await response.json();
                setCards((prevCards) =>
                    prevCards.map((c) => (c.id === card.id ? updatedCard : c))
                );
                setIsEditing(false);
            } else {
                console.error("Erreur lors de la mise à jour");
            }
        } catch (error) {
            console.error("Erreur serveur", error);
        }
    };
    const handleDelete = async () => {
        setIsDelete(true);
        console.log("Suppression de la carte", card.id);


        const response = await fetch(`/api/cards?id=${card.id}`, {
            method: "DELETE",
        });
        if (response.ok) {
            setCards((prevCards) => prevCards.filter((c) => c.id !== card.id));
            console.log("✅ Carte supprimée avec succès !");
        } else {
            console.error("❌ Erreur lors de la suppression");
        }
        setIsDelete(false);
    };

    return (
        <section className="py-6 sm:py-12 flex justify-center">
            <Card className="h-[400px] text-justify flex flex-col justify-center  border-maincolor border">
                <Image src={card.image}
                    className="w-16 h-16 mx-auto mt-8 object-cover"
                    width={128}
                    height={128}
                    alt="Image d'accueil" />
                <CardHeader>
                    {isEditing ? (
                        <input
                            type="text"
                            value={updatedTitle}
                            onChange={(e) => setUpdatedTitle(e.target.value)}
                            className="border p-1 rounded w-full"
                        />
                    ) : (
                        <CardTitle>{updatedTitle}</CardTitle>
                    )}
                </CardHeader>
                <CardContent>
                    {isEditing ? (
                        <textarea
                            value={updatedDescription}
                            onChange={(e) => setUpdatedDescription(e.target.value)}
                            className="border p-1 flex rounded w-full"
                        />
                    ) : (
                        <p>{updatedDescription}</p>
                    )}
                </CardContent>
                {session && session.user.role === "admin" && (
                    <div className="flex justify-center gap-2 mt-auto mb-12">
                        {isEditing ? (
                            <Button onClick={handleUpdate}>Enregistrer</Button>
                        ) : (
                            <Button onClick={() => setIsEditing(true)}>Modifier</Button>
                        )}
                        <Button className="bg-red-600" onClick={handleDelete} disabled={isDelete}>
                            {isDelete ? "Suppression..." : "Supprimer"}
                        </Button>
                    </div>
                )}
            </Card>
        </section>
    );
}