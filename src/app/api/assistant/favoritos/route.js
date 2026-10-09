
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const USUARIO_TESTE_ID = 1;

export async function GET(request) {
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

    const favoritos = await prisma.favorito.findMany({
      where: {
        usuarioId: USUARIO_TESTE_ID,
      },
      include: {
        item: {
          include: {
            categoria: true,
          },
        },
      },
      orderBy: {
        id: "desc",
      },
    });

    const produtos = favoritos.map((favorito) => ({
      id: favorito.item.id,
      nome: favorito.item.nome,
      categoria: favorito.item.categoria.nome,
      estadoConservacao: favorito.item.estadoConservacao,
      localizacao: favorito.item.localizacao,
    }));

    return NextResponse.json({
      sucesso: true,
      quantidade: produtos.length,
      favoritos: produtos,
    });
  } catch (error) {
    console.error("Erro ao consultar favoritos:", error);

    return NextResponse.json(
      {
        sucesso: false,
        mensagem: "Nao foi possivel consultar os favoritos.",
      },
      { status: 500 }
    );
  }
}
