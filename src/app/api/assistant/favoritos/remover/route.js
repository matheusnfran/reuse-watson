
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const USUARIO_TESTE_ID = 1;

export async function POST(request) {
  try {
    const chaveEsperada = process.env.ASSISTANT_EXTENSION_API_KEY;
    const chaveRecebida = request.headers.get("X-ReUse-Extension-Key");

    if (!chaveEsperada || chaveRecebida !== chaveEsperada) {
      return NextResponse.json(
        {
          sucesso: false,
          mensagem: "Acesso nao autorizado.",
        },
        { status: 401 }
      );
    }

    let dados;

    try {
      dados = await request.json();
    } catch {
      return NextResponse.json(
        {
          sucesso: false,
          mensagem: "Envie um JSON valido.",
        },
        { status: 400 }
      );
    }

    const { itemId, confirmado } = dados ?? {};

    if (!Number.isSafeInteger(itemId) || itemId <= 0) {
      return NextResponse.json(
        {
          sucesso: false,
          mensagem: "Informe um itemId inteiro e positivo.",
        },
        { status: 400 }
      );
    }

    if (confirmado !== true) {
      return NextResponse.json(
        {
          sucesso: false,
          mensagem:
            "Remocao nao realizada. E necessaria a confirmacao explicita do usuario.",
        },
        { status: 400 }
      );
    }

    const favorito = await prisma.favorito.findUnique({
      where: {
        usuarioId_itemId: {
          usuarioId: USUARIO_TESTE_ID,
          itemId,
        },
      },
      include: {
        item: true,
      },
    });

    if (!favorito) {
      return NextResponse.json(
        {
          sucesso: false,
          mensagem: "Este produto nao esta nos favoritos.",
        },
        { status: 404 }
      );
    }

    await prisma.favorito.delete({
      where: {
        usuarioId_itemId: {
          usuarioId: USUARIO_TESTE_ID,
          itemId,
        },
      },
    });

    revalidatePath("/itens");
    revalidatePath("/favoritos");

    return NextResponse.json({
      sucesso: true,
      mensagem: "Produto removido dos favoritos com sucesso.",
      produtoRemovido: {
        id: favorito.item.id,
        nome: favorito.item.nome,
      },
    });
  } catch (error) {
    console.error("Erro ao remover favorito pelo assistente:", error);

    return NextResponse.json(
      {
        sucesso: false,
        mensagem: "Nao foi possivel remover o produto dos favoritos.",
      },
      { status: 500 }
    );
  }
}
