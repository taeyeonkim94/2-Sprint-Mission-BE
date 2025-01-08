-- AlterTable
ALTER TABLE "ArticleComment" ADD COLUMN     "favoriteCount" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "ProductComment" ADD COLUMN     "favoriteCount" INTEGER NOT NULL DEFAULT 0;
