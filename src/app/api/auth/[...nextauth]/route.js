import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "example@example.com" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                console.log(credentials);
                // Récupérer l'utilisateur en base de données
                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                });

                if (!user) {
                    // Retourner null plutôt que de lancer une exception pour que NextAuth gère l'erreur
                    return null;
                }

                // Vérifier le mot de passe haché
                const isValidPassword = await bcrypt.compare(credentials.password, user.password);

                if (!isValidPassword) {
                    // Retourner null plutôt que de lancer une exception
                    return null;
                }

                // Si les informations sont valides, retourner l'utilisateur avec les informations nécessaires
                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role, // Ajout du rôle
                };
            },
        }),
    ],
    callbacks: {
        async session({ session, token }) {
            if (token) {
                session.user.role = token.role;
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
            }
            return token;
        },
    },
    pages: {
        signIn: "/adminpage", // Page de connexion personnalisée
    },
    secret: process.env.NEXTAUTH_SECRET, // Assurez-vous que cette variable est bien définie dans votre .env
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
