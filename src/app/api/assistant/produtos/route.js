
import { NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";
import prisma from "../../../../lib/prisma";

function chaveValida(request) {
  const chaveConfigurada = process.env.ASSISTANT_EXTENSION_API_KEY;
  const chaveRecebida = request.headers.get("X-ReUse-Extension-Key");

  if (!chaveConfigurada || !chaveRecebida) {
    return false;
  }

  const esperada = Buffer.from(chaveConfigurada, "utf8");
  const recebida = Buffer.from(chaveRecebida, "utf8");

  if (esperada.length !== recebida.length) {
    return false;
  }

  return timingSafeEqual(esperada, recebida);
}

export async function GET(request) {
  if (!chaveValida(request)) {
    return NextResponse.json(
      {
        sucesso: false,
        mensagem: "Acesso nao autorizado.",
      },
      { status: 401 }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const busca = searchParams.get("busca")?.trim() || "";

    const produtos = await prisma.item.findMany({
      where: busca
        ? {
            nome: {
              contains: busca,
              mode: "insensitive",
            },
          }
        : {},
      select: {
        id: true,
        nome: true,
      },
      orderBy: {
        id: "asc",
      },
      take: 20,
    });

    return NextResponse.json({
      sucesso: true,
      quantidade: produtos.length,
      produtos,
    });
  } catch (error) {
    console.error("Erro ao consultar produtos:", error);

    return NextResponse.json(
      {
        sucesso: false,
        mensagem: "Nao foi possivel consultar os produtos.",
      },
      { status: 500 }
    );
  }
}
