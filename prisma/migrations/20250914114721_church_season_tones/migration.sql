-- CreateEnum
CREATE TYPE "public"."SeasonTones" AS ENUM ('ANNUAL', 'FARAIHI', 'SHAANINI', 'KIAHKI', 'SIAMI', 'HAZAINI');

-- AlterTable
ALTER TABLE "public"."church_seasons" ADD COLUMN     "seasonTone" "public"."SeasonTones" NOT NULL DEFAULT 'ANNUAL';
