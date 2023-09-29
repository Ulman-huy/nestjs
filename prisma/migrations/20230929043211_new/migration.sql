/*
  Warnings:

  - You are about to drop the column `postId` on the `comment` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `comment` table. All the data in the column will be lost.
  - You are about to drop the column `postId` on the `image` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `image` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `fullName` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `hashedPassword` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `user` table. All the data in the column will be lost.
  - Added the required column `postid` to the `comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userid` to the `comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userid` to the `image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userid` to the `post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hashedpassword` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "comment" DROP CONSTRAINT "comment_postId_fkey";

-- DropForeignKey
ALTER TABLE "comment" DROP CONSTRAINT "comment_userId_fkey";

-- DropForeignKey
ALTER TABLE "image" DROP CONSTRAINT "image_postId_fkey";

-- DropForeignKey
ALTER TABLE "image" DROP CONSTRAINT "image_userId_fkey";

-- DropForeignKey
ALTER TABLE "post" DROP CONSTRAINT "post_userId_fkey";

-- AlterTable
ALTER TABLE "comment" DROP COLUMN "postId",
DROP COLUMN "userId",
ADD COLUMN     "postid" INTEGER NOT NULL,
ADD COLUMN     "userid" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "image" DROP COLUMN "postId",
DROP COLUMN "userId",
ADD COLUMN     "postid" INTEGER,
ADD COLUMN     "userid" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "post" DROP COLUMN "userId",
ADD COLUMN     "userid" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "firstName",
DROP COLUMN "fullName",
DROP COLUMN "hashedPassword",
DROP COLUMN "lastName",
ADD COLUMN     "firstname" TEXT,
ADD COLUMN     "fullname" TEXT,
ADD COLUMN     "hashedpassword" TEXT NOT NULL,
ADD COLUMN     "lastname" TEXT;

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_userid_fkey" FOREIGN KEY ("userid") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_postid_fkey" FOREIGN KEY ("postid") REFERENCES "post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_userid_fkey" FOREIGN KEY ("userid") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "image" ADD CONSTRAINT "image_userid_fkey" FOREIGN KEY ("userid") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "image" ADD CONSTRAINT "image_postid_fkey" FOREIGN KEY ("postid") REFERENCES "post"("id") ON DELETE SET NULL ON UPDATE CASCADE;
