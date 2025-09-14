-- CreateTable
CREATE TABLE "public"."church_seasons" (
    "id" TEXT NOT NULL,
    "seasonName_ar" TEXT NOT NULL,
    "seasonName_en" TEXT NOT NULL,
    "seasonName_co" TEXT NOT NULL,
    "backgroundColor" TEXT NOT NULL,
    "textColor" TEXT NOT NULL,
    "accentColor" TEXT,
    "openingPhrase" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "longDescription" TEXT,
    "images" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "specialIcon" TEXT,
    "bannerImage" TEXT,
    "thumbnailImage" TEXT,
    "postLink" TEXT,
    "externalLinks" JSONB,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "isRecurring" BOOLEAN NOT NULL DEFAULT false,
    "recurrenceRule" TEXT,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "isPublic" BOOLEAN NOT NULL DEFAULT true,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "slug" TEXT NOT NULL,
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "socialImage" TEXT,
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "lastViewedAt" TIMESTAMP(3),
    "createdBy" TEXT,
    "updatedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "church_seasons_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "church_seasons_slug_key" ON "public"."church_seasons"("slug");

-- CreateIndex
CREATE INDEX "church_seasons_startDate_endDate_idx" ON "public"."church_seasons"("startDate", "endDate");

-- CreateIndex
CREATE INDEX "church_seasons_isPublic_isFeatured_idx" ON "public"."church_seasons"("isPublic", "isFeatured");

-- CreateIndex
CREATE INDEX "church_seasons_slug_idx" ON "public"."church_seasons"("slug");
