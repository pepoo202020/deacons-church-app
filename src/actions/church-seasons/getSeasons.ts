"use server";

import prisma from "@/lib/prisma";

export async function getChurchSeasons() {
  try {
    const seasons = await prisma.churchSeason.findMany();
    return {
      success: true,
      data: seasons,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
    };
  }
}
