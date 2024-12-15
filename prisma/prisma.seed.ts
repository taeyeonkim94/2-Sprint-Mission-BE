import { NestFactory } from '@nestjs/core';
import { PrismaService } from './prisma.service';
import USERS from './mock/mock.user';
import { AppModule } from '../src/app.module';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(AppModule);
  const prismaService = appContext.get(PrismaService);
  await main(prismaService);
  await appContext.close();
}
async function main(prisma: PrismaService) {
  await prisma.user.deleteMany();
  await prisma.user.createMany({
    data: USERS,
    skipDuplicates: true,
  });
  console.log('Seeding completed.');
}
bootstrap().catch((e) => {
  console.error(e);
  process.exit(1);
});
