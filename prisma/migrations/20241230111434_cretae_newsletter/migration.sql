-- CreateTable
CREATE TABLE "newsletters" (
    "email" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "newsletters_email_key" ON "newsletters"("email");
