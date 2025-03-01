import * as React from "react";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CldImage } from "next-cloudinary";
import { Upload } from "lucide-react";

export function CardWithForm({ card, setCards }) {
    const [title, setTitle] = useState(card ? card.title : "");
    const [description, setDescription] = useState(card ? card.description : "");
    const [image, setImage] = useState(card ? card.image : ""); // Stockera l'URL Cloudinary
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [uploading, setUploading] = useState(false);
    const uploadFiles = useRef(null);

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "vitrine"); // Remplace par ton upload preset Cloudinary

        try {
            const response = await fetch("https://api.cloudinary.com/v1_1/dosqdbucn/image/upload", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();
            setImage(data.secure_url); // On stocke l'URL sécurisée de l'image
        } catch (error) {
            console.error("Erreur lors de l'upload :", error);
        }

        setUploading(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const response = await fetch("/api/cards", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title, description, image }),
        });

        if (!response.ok) {
            setIsSubmitting(false);
            return;
        }

        const newCard = await response.json();
        setIsSubmitting(false);
        setCards((prevCards) => [...prevCards, newCard]);

        setTitle("");
        setDescription("");
        setImage("");
    };

    const handleCancel = () => {
        setTitle("");
        setDescription("");
        setImage("");
    };

    return (
        <>
            <h1 className="text-4xl font-bold text-center text-maincolor pt-8">Bonjour Administrateur</h1>
            <div className="w-full flex justify-center py-12">
                <form className="border-black border p-4 rounded-md sm:w-1/4" onSubmit={handleSubmit}>
                    <div className="flex flex-col space-y-1.5 pb-4">
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Titre du service"
                            required
                        />
                    </div>
                    <div className="flex flex-col space-y-1.5 pb-4">
                        <Label htmlFor="description">Description</Label>
                        <textarea
                            className="h-48 border"
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Description"
                            required
                        />
                    </div>
                    <div className="flex flex-col space-y-1.5 items-center">
                        <Label className="text-center" htmlFor="image">Télécharger une image</Label>
                        <Input
                            id="image"
                            type="file"
                            ref={uploadFiles}
                            className="hidden"
                            onChange={handleImageUpload}
                            required
                        />
                        <Button className="w-[30px] h-[30px]" type="button" onClick={() => uploadFiles.current?.click()}>
                            <Upload />
                        </Button>
                        {uploading && <p>Uploading...</p>}
                        {image && (
                            <CldImage width="480" height="300" src={image} sizes="100vw" alt="Uploaded image" />
                        )}
                    </div>
                    <div className="mt-4 flex justify-between">
                        <Button type="button" onClick={handleCancel}>Cancel</Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Submitting..." : card ? "Update" : "Add"}
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}
