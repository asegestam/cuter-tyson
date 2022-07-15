import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

// use `prisma` in your application to read and write data in your DB
export default defineEventHandler(async (event) => {

    const requestQuery = useQuery(event);

    const except =  requestQuery.except || 0;    

    const [first, second] = await getOptionsForVote(parseInt(except));

    const tysons = await prisma.tyson.findMany({
        where: { id: { in: [first, second] } },
    });

    return {
      firstTyson: tysons[0],
      secondTyson: tysons[1],
    }
})

const getRandomTyson = async (exceptThisId?: number, tysonCount?: number) => {
  const count = tysonCount || await prisma.tyson.count();
  
  const random = Math.floor(Math.random() * count) + 1;

  if(random === exceptThisId) {
    return getRandomTyson(exceptThisId);
  }

  return random;
};

const getOptionsForVote = async (exceptThisId?:  number) => {
  const count = await prisma.tyson.count();
  const first = await getRandomTyson(exceptThisId, count);
  const second = await getRandomTyson(first, count);

  return [first, second];
}
