import { PrismaClient } from '@prisma/client';

declare global {
    var cachedPrisma: PrismaClient | undefined; // Define global variable with possible undefined type
}

let prisma: PrismaClient;  // Local instance of PrismaClient type

if (process.env.NODE_ENV === "production") {
    prisma = new PrismaClient();  // Create a new PrismaClient instance in production
} else {
    if (!global.cachedPrisma) {  // If there's no cached PrismaClient instance
        global.cachedPrisma = new PrismaClient();
    }
    prisma = global.cachedPrisma; // Use the cached instance in development
}

export const db = prisma;


