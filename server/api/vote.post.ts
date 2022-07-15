import { PrismaClient, Vote } from '@prisma/client'

const prisma = new PrismaClient();

type VoteBody = {
    votedForId: number,
    votedAgainstId: number
};

export default defineEventHandler(async (event) => {
    const body: VoteBody = await useBody(event);
    
    const vote = await prisma.vote.create({
        data: { 
            votedForId: body.votedForId, 
            votedAgainstId: body.votedAgainstId
        }   
    });

    return { success: true, vote: vote };
})

