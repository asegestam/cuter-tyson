import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

// use `prisma` in your application to read and write data in your DB
export default defineEventHandler(async (event) => {

    await prisma.vote.deleteMany({});
    
    return {
        success: true
    }
})

