
import Link from "next/link";
import Image from "next/image";
import prisma from "@/lib/prisma";
import {
  favoritarItem,
  removerFavorito,
} from "@/app/actions/favoritos";

const USUARIO_TESTE_ID = 1;

function getImagem(nome) {
  const imagens = {
    "Cadeira de Escritório": "/produtos/cadeira.webp",
    Notebook: "/produtos/notebook.webp",
    "Livro de Design": "/produtos/livro.jpg",
    "Jaqueta Jeans": "/produtos/jaqueta.webp",
    "Luminária de Mesa": "/produtos/luminaria.webp",
    "Fone de Ouvido": "/produtos/fone.PNG",
  };

  return imagens[nome] || null;
}

export default async function ProdutoPage({ params }) {
  const { id } = await params;

  const item = await prisma.item.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      categoria: true,
      usuario: true,
      favoritos: {
        where: {
          usuarioId: USUARIO_TESTE_ID,
        },
      },
    },
  });

  if (!item) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F4EFE8]">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Produto não encontrado
          </h1>

          <Link
            href="/itens"
            className="mt-4 inline-block font-semibold text-[#0D5C3F] hover:underline"
          >
            Voltar para itens
          </Link>
        </div>
      </main>
    );
  }

  const estaFavoritado = item.favoritos.length > 0;
  const imagem = getImagem(item.nome);

  return (
    <main className="min-h-screen bg-[#F4EFE8]">
      <header className="border-b border-black/5 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link
            href="/itens"
            className="text-3xl font-bold text-[#0D5C3F]"
          >
            ReUse!
          </Link>

          <nav className="flex items-center gap-6">
            <Link
              href="/itens"
              className="font-medium text-gray-600 transition hover:text-[#0D5C3F]"
            >
              Itens
            </Link>

            <Link
              href="/favoritos"
              className="font-medium text-gray-600 transition hover:text-[#0D5C3F]"
            >
              ♡ Favoritos
            </Link>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-10">
        <Link
          href="/itens"
          className="mb-6 inline-block font-medium text-[#0D5C3F] hover:underline"
        >
          ← Voltar para itens
        </Link>

        <div className="grid overflow-hidden rounded-3xl bg-white shadow-sm md:grid-cols-2">
          <div className="relative min-h-[360px] bg-[#E7E1D8] md:min-h-[480px]">
            {imagem ? (
              <Image
                src={imagem}
                alt={`Foto do produto ${item.nome}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            ) : (
              <div className="flex h-full min-h-[360px] items-center justify-center">
                <span
                  className="text-8xl"
                  aria-hidden="true"
                >
                  ♻️
                </span>
              </div>
            )}
          </div>

          <div className="p-8 md:p-10">
            <span className="font-medium text-[#0D5C3F]">
              {item.categoria.nome}
            </span>

            <h1 className="mt-2 text-3xl font-bold text-gray-900">
              {item.nome}
            </h1>

            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-full bg-[#F4EFE8] px-4 py-2 text-sm text-gray-700">
                {item.estadoConservacao}
              </span>

              <span className="rounded-full bg-[#F4EFE8] px-4 py-2 text-sm text-gray-700">
                📍 {item.localizacao}
              </span>
            </div>

            <div className="mt-8">
              <h2 className="font-semibold text-gray-900">
                Descrição
              </h2>

              <p className="mt-2 leading-7 text-gray-600">
                {item.descricao}
              </p>
            </div>

            <div className="mt-8 rounded-2xl border border-gray-200 p-5">
              <p className="text-sm text-gray-500">
                Disponibilizado por
              </p>

              <p className="mt-1 font-semibold text-gray-900">
                {item.usuario.nome}
              </p>
            </div>

            <form
              action={async () => {
                "use server";

                if (estaFavoritado) {
                  await removerFavorito(item.id);
                } else {
                  await favoritarItem(item.id);
                }
              }}
              className="mt-8"
            >
              <button
                type="submit"
                aria-label={
                  estaFavoritado
                    ? `Remover ${item.nome} dos favoritos`
                    : `Adicionar ${item.nome} aos favoritos`
                }
                className={
                  estaFavoritado
                    ? "w-full rounded-xl bg-[#0D5C3F] px-5 py-3 font-semibold text-white transition hover:bg-[#0a4932]"
                    : "w-full rounded-xl border border-[#0D5C3F] px-5 py-3 font-semibold text-[#0D5C3F] transition hover:bg-[#0D5C3F] hover:text-white"
                }
              >
                {estaFavoritado
                  ? "♥ Remover dos favoritos"
                  : "♡ Adicionar aos favoritos"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
