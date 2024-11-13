import { PrismaClient } from "@prisma/client";
import mockData from "./mock.js";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

async function main() {
  const hashedUsers = await Promise.all(
    mockData.users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10); // 비밀번호 해싱
      return { ...user, password: hashedPassword }; // 해싱된 비밀번호로 사용자 객체 반환
    })
  );

  await prisma.user.deleteMany();
  await prisma.product.deleteMany();
  await prisma.article.deleteMany();
  await prisma.productComment.deleteMany();
  await prisma.articleComment.deleteMany();
  await prisma.user.createMany({
    data: hashedUsers,
    skipDuplicates: true
  });
  await prisma.product.createMany({
    data: mockData.products,
    skipDuplicates: true
  });
  await prisma.article.createMany({
    data: mockData.articles,
    skipDuplicates: true
  });
  await prisma.productComment.createMany({
    data: mockData.productComments,
    skipDuplicates: true
  });
  await prisma.articleComment.createMany({
    data: mockData.articleComments,
    skipDuplicates: true
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
