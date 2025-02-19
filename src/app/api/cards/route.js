import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from 'uuid';


const prisma = new PrismaClient();

export async function POST(req, res) {
    try {
        if (!req.body) {
            console.error("❌ `req.body` est null ou undefined");
            return new Response(JSON.stringify({ error: "Requête invalide" }), { status: 400 });
        }
        const body = await req.json(); // Lire le JSON envoyé
        console.log("📩 Données reçues :", body); // Debug


        if (!body || !body.title || !body.description || !body.image) {
            return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 });
        }

        const card = await prisma.card.create({
            data: {
                id: uuidv4(),
                title: body.title,
                description: body.description,
                image: body.image,
            },
        });

        return NextResponse.json(card, { status: 201 });
    } catch (error) {
        console.error("🚨 Erreur serveur :", error.stack);
        return NextResponse.json({ error: "Erreur serveur, vérifiez la console." }, { status: 500 });
    }
}
// GET : Récupérer toutes les cartes
export async function GET() {
    try {
        const cards = await prisma.card.findMany();
        return NextResponse.json(cards, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Erreur lors de la récupération des cartes" }, { status: 500 });
    }
}


export async function DELETE(req) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "ID requis" }, { status: 400 });
        }

        // Vérifier si la carte existe
        const existingCard = await prisma.card.findUnique({
            where: { id },
        });

        if (!existingCard) {
            return NextResponse.json({ error: "Carte non trouvée" }, { status: 404 });
        }

        // Supprimer la carte
        await prisma.card.delete({
            where: { id },
        });

        return NextResponse.json({ message: "Carte supprimée avec succès" }, { status: 200 });

    } catch (error) {
        console.error("🚨 Erreur lors de la suppression :", error);
        return NextResponse.json({ error: "Erreur serveur, vérifiez la console." }, { status: 500 });
    }
}

export async function PUT(req) {
    try {
        const { id, title, description, image } = await req.json();

        if (!id) {
            return NextResponse.json({ error: "ID manquant" }, { status: 400 });
        }

        const updatedCard = await prisma.card.update({
            where: { id },
            data: { title, description, image },
        });

        return NextResponse.json(updatedCard, { status: 200 });
    } catch (error) {
        console.error("Erreur lors de la mise à jour :", error);
        return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
    }
}
