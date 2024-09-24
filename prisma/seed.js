import { PrismaClient } from "@prisma/client";
import mockData from "./mock.js";
const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();
  await prisma.product.deleteMany();
  await prisma.article.deleteMany();
  await prisma.productComment.deleteMany();
  await prisma.articleComment.deleteMany();
  mockData.product.forEach((el) => console.log(el));
  mockData.article.forEach((el) => console.log(el));
  console.log("createUser");
  await prisma.user.createMany({
    data: mockData.user,
    skipDuplicates: true
  });
  console.log("createUser END");
  console.log("createProduct start");
  await prisma.product
    .createMany({
      data: mockData.product,
      skipDuplicates: true
    })
    .then(() => console.log("Products created."))
    .catch((err) => console.error("Error creating products:", err));
  console.log("createProduct END");
  console.log("crateAriticle start");
  await prisma.article
    .createMany({
      data: mockData.article,
      skipDuplicates: true
    })
    .then(() => console.log("Articles created."))
    .catch((err) => console.error("Error creating articles:", err));
  console.log("crateAriticle end");
  console.log("productComment start");
  await prisma.productComment.createMany({
    data: mockData.productComment,
    skipDuplicates: true
  });
  console.log("productComment end");
  console.log("articleComment start");
  await prisma.articleComment.createMany({
    data: mockData.articleComment,
    skipDuplicates: true
  });
  console.log("articleComment end");
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
