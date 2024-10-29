-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "xp" BIGINT NOT NULL DEFAULT 0,
    "level" INTEGER NOT NULL DEFAULT 1,
    "lastLogin" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Level" (
    "level" INTEGER NOT NULL,
    "xpThreshold" BIGINT NOT NULL,

    CONSTRAINT "Level_pkey" PRIMARY KEY ("level")
);
