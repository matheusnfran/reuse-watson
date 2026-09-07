"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const USUARIO_TESTE_ID = 1;

export async function favoritarItem(itemId) {
  await prisma.favorito.upsert({
    where: {
      usuarioId_itemId: {
        usuarioId: USUARIO_TESTE_ID,
        itemId,
      },
    },
    update: {},
    create: {
      usuarioId: USUARIO_TESTE_ID,
      itemId,
    },
  });

  revalidatePath("/itens");
  revalidatePath("/favoritos");
}

export async function removerFavorito(itemId) {
  await prisma.favorito.deleteMany({
    where: {
      usuarioId: USUARIO_TESTE_ID,
      itemId,
    },
  });

  revalidatePath("/itens");
  revalidatePath("/favoritos");
}