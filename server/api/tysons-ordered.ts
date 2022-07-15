import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

// use `prisma` in your application to read and write data in your DB
export default defineEventHandler(async (event) => {

    const result = await prisma.tyson.findMany({
        orderBy: {
          VoteFor: { _count: "desc" },
        },
        select: {
          id: true,
          name: true,
          imgPath: true,
          _count: {
            select: {
              VoteFor: true,
              VoteAgainst: true,
            },
          },
        },
      });


      const orderedTysons = result.sort((a, b) => {
        const difference = generateCountPercent(b) - generateCountPercent(a);

        if (difference === 0) {
          return b._count.VoteFor - a._count.VoteFor;
        }

        return difference;
      });
    
    
    return orderedTysons;
});

const generateCountPercent = (tyson) => {
  const { VoteFor, VoteAgainst } = tyson._count;

  if (VoteFor + VoteAgainst === 0) {
      return 0;
  }
  return (VoteFor / (VoteFor + VoteAgainst)) * 100;
};