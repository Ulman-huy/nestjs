-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "slug" TEXT,
    "hashed_password" TEXT NOT NULL,
    "first_name" TEXT,
    "last_name" TEXT,
    "full_name" TEXT,
    "image" TEXT,
    "bio" TEXT,
    "location" TEXT,
    "friends" INTEGER[],
    "birthday" TIMESTAMP(3),
    "background" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "post" (
    "id" SERIAL NOT NULL,
    "description" TEXT DEFAULT '',
    "images" TEXT DEFAULT '',
    "likes" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
    "hahas" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
    "dears" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
    "angrys" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
    "wows" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
    "sads" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
    "hides" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
    "hearts" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
    "share" INTEGER DEFAULT 0,
    "comment" INTEGER DEFAULT 0,
    "type" TEXT DEFAULT 'DEFAULT',
    "background" TEXT DEFAULT '',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comment" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT,
    "likes" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
    "hahas" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
    "dears" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
    "angrys" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
    "wows" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
    "hearts" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
    "sads" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
    "share" INTEGER DEFAULT 0,
    "feedback" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
    "type" TEXT NOT NULL DEFAULT 'DEFAULT',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" INTEGER NOT NULL,
    "post_id" INTEGER NOT NULL,

    CONSTRAINT "comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "image" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "post_id" INTEGER,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "room" (
    "id" SERIAL NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "list_avatar" TEXT[],
    "list_owner" INTEGER[],
    "list_name" TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chatMessage" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "sender_id" INTEGER NOT NULL,
    "reciver_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "chatMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "addFriendRequest" (
    "id" SERIAL NOT NULL,
    "sender_id" INTEGER NOT NULL,
    "reciver_id" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'WAITING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "addFriendRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "image" ADD CONSTRAINT "image_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "image" ADD CONSTRAINT "image_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chatMessage" ADD CONSTRAINT "chatMessage_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "addFriendRequest" ADD CONSTRAINT "addFriendRequest_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
