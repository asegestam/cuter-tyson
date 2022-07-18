import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

// use `prisma` in your application to read and write data in your DB
export default defineEventHandler(async (event) => {

  const requestQuery = useQuery(event);

  const except = requestQuery.except || 0;

  const tysons = await prisma.$queryRaw`
  SELECT * FROM Tyson WHERE id != ${except} ORDER BY RAND() LIMIT 2
  `;

  return {
    firstTyson: tysons[0],
    secondTyson: tysons[1],
  }
})
