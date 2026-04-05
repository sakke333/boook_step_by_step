-- CreateTable
CREATE TABLE "WishListing" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT,
    "isbn" TEXT,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "requesterId" TEXT NOT NULL,

    CONSTRAINT "WishListing_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WishListing" ADD CONSTRAINT "WishListing_requesterId_fkey" FOREIGN KEY ("requesterId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
