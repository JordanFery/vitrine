/*
  Warnings:

  - You are about to drop the "service" table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "service";

-- CreateTable
CREATE TABLE "card" (
    "id" VARCHAR(191) NOT NULL,
    "title" VARCHAR(191) NOT NULL,
    "description" VARCHAR(191) NOT NULL,
    "image" VARCHAR(191) NOT NULL,
    "price" VARCHAR(191) NOT NULL,

    PRIMARY KEY ("id")
) 
