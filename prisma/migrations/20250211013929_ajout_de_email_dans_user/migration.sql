-- -- CreateTable
-- CREATE TABLE "service" (
--     "id" VARCHAR(191) NOT NULL,
--     "title" VARCHAR(191) NOT NULL,
--     "description" VARCHAR(191) NOT NULL,
--     "image" VARCHAR(191) NOT NULL,
--     "price" VARCHAR(191) NOT NULL,

--     PRIMARY KEY ("id")
-- ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- -- CreateTable
-- CREATE TABLE "User" (
--     "id" VARCHAR(191) NOT NULL,
--     "name" VARCHAR(191) NOT NULL,
--     "email" VARCHAR(191) NOT NULL,
--     "password" VARCHAR(191) NOT NULL,
--     "role" VARCHAR(191) NOT NULL DEFAULT 'user',

--     UNIQUE INDEX "User_email_key"("email"),
--     PRIMARY KEY ("id")
-- ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;


-- Création de la table "service"
CREATE TABLE "service" (
    "id" VARCHAR NOT NULL,
    "title" VARCHAR NOT NULL,
    "description" VARCHAR NOT NULL,
    "image" VARCHAR NOT NULL,
    "price" VARCHAR NOT NULL,

    PRIMARY KEY ("id")
);

-- Création de la table "User"
CREATE TYPE "role_enum" AS ENUM ('user', 'admin');

CREATE TABLE "User" (
    "id" VARCHAR NOT NULL,
    "name" VARCHAR NOT NULL,
    "email" VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL,
    "role" "role_enum" NOT NULL DEFAULT 'user',

    CONSTRAINT "User_email_key" UNIQUE("email"),
    PRIMARY KEY ("id")
);
