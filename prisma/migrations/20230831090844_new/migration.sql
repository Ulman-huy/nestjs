-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "slug" TEXT,
    "hashedPassword" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "fullName" TEXT,
    "image" TEXT,
    "bio" TEXT,
    "location" TEXT,
    "friends" TEXT[],
    "birthday" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "post" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "images" TEXT,
    "like" INTEGER DEFAULT 0,
    "haha" INTEGER DEFAULT 0,
    "dear" INTEGER DEFAULT 0,
    "angry" INTEGER DEFAULT 0,
    "wow" INTEGER DEFAULT 0,
    "sad" INTEGER DEFAULT 0,
    "share" INTEGER DEFAULT 0,
    "comment" INTEGER DEFAULT 0,
    "type" TEXT DEFAULT 'DEFAULT',
    "background" TEXT DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comment" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT,
    "like" INTEGER DEFAULT 0,
    "haha" INTEGER DEFAULT 0,
    "dear" INTEGER DEFAULT 0,
    "angry" INTEGER DEFAULT 0,
    "wow" INTEGER DEFAULT 0,
    "sad" INTEGER DEFAULT 0,
    "share" INTEGER DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "postId" INTEGER NOT NULL,

    CONSTRAINT "comment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
