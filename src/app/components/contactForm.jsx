"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react"
import emailjs from "@emailjs/browser";
import Image from "next/image"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"


const formSchema = z.object({
    username: z.string().min(2, {
        message: "Le nom d'utilisateur doit contenir au moins 2 caractères"
    }).max(50, {
        message: "Le nom d'utilisateur doit contenir au maximum 50 caractères"
    }),
    email: z.string().email({
        message: "L'adresse mail renseigné n'a pas un format valide"
    }),
    objet: z.string().min(5, {
        message: "L'objet doit contenir au moins 5 caractères"
    }).max(50, {
        message: "L'objet doit contenir au maximum 50 caractères"
    }),
    message: z.string().min(5, {
        message: "Le message doit contenir au moins 5 caractères"
    }).max(800, {
        message: "Le message doit contenir au maximum 800 caractères"
    })
})
export default function Contact() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isFormSubmitted, setIsFormSubmitted] = useState(false)
    const [submitError, setSubmitError] = useState("")

    // 1. Define your form.
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            email: "",
            objet: "",
            message: "",
        },
    })
    const onSubmit = async (data) => {
        setIsSubmitting(true)
        setSubmitError("")

        const templateParams = {
            to_name: 'Jordan',
            from_name: data.username,
            object: data.objet,
            email: data.email,
            message: data.message
        }

        try {
            await emailjs.send(
                process.env.NEXT_PUBLIC_SERVICE_ID,
                process.env.NEXT_PUBLIC_TEMPLATE_ID,
                templateParams,
                process.env.NEXT_PUBLIC_EMAILJS_KEY
            )
            setIsFormSubmitted(true)
            setTimeout(() => {
                window.location.replace("")
            }, 4000)
        } catch (error) {
            console.error("Erreur lors de l'envoi de l'email", error)
            setSubmitError("Échec de l'envoi de l'email. Veuillez réessayer.")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="w-screen h-screen flex justify-evenly items-center pb-24">
            <div className="flex flex-col bg-white p-6 rounded-lg">
                <h1 className="text-3xl font-bold pt-24 pb-16 text-maincolor">Laissez-nous votre message !</h1>
                {isFormSubmitted ? (
                    <div className="text-center">
                        <h2 className="text-xl font-semibold text-green-600">
                            ✅ Votre message a été envoyé avec succès !
                        </h2>
                        <p className="mt-2 text-gray-700">
                            Nous vous répondrons dans les plus brefs délais.
                        </p>
                    </div>
                ) : (
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-maincolor font-bold">Nom et prénom</FormLabel>
                                        <FormControl className="border-zinc-200"><Input {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-maincolor font-bold">Email</FormLabel>
                                        <FormControl className="broder-zinc-200"><Input {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="objet"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-maincolor font-bold">Objet</FormLabel>
                                        <FormControl className="border-zinc-200"><Input {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="message"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-maincolor font-bold">Message</FormLabel>
                                        <FormControl className="border-zinc-200">
                                            <textarea className="border p-2 w-full rounded-md h-48" {...field} ></textarea>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {submitError && <p className="text-red-500">{submitError}</p>}
                            <div className="mt-8">
                                <Button className="w-1/3 h-10 bg-cta rounded-full" type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? "Envoi..." : "Envoyer"}
                                </Button>
                            </div>
                        </form>
                    </Form>
                )}
            </div>
            <Image
                src='/images/form.jpg'
                height={502}
                width={502}
                alt="image formulaire"
                className="hidden lg:block"
            />
        </div>
    )

}