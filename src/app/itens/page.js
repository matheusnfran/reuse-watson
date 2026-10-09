
import Link from "next/link";
import Image from "next/image";
import prisma from "@/lib/prisma";
import BuscaItens from "@/app/components/BuscaItens";
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

export default async function ItensPage({ searchParams }) {
  const params = await searchParams;

  const busca = params?.busca || "";
  const categoria = params?.categoria || "";

  const categorias = await prisma.categoria.findMany({
    orderBy: {
      nome: "asc",
    },
  });

  const itens = await prisma.item.findMany({
    where: {
      AND: [
        busca
          ? {
              nome: {
                contains: busca,
                mode: "insensitive",
              },
            }
          : {},
        categoria
          ? {
              categoria: {
                nome: categoria,
              },
            }
          : {},
      ],
    },
    include: {
      categoria: true,
      favoritos: {
        where: {
          usuarioId: USUARIO_TESTE_ID,
        },
      },
    },
    orderBy: {
      id: "asc",
    },
  });

  return (
    <main className="min-h-screen bg-[#F4EFE8]">
      <header className="border-b border-black/5 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link
            href="/itens"
            aria-label="ReUse - Página de itens"
            className="flex shrink-0 items-center"
          >
            <Image
              src="/produtos/reuselogo1.png"
              alt="Logo ReUse"
              width={180}
              height={60}
              priority
              className="h-auto w-36 sm:w-44"
            />
          </Link>

          <nav className="flex items-center gap-4 sm:gap-6">
            <Link
              href="/itens"
              className="font-medium text-[#0D5C3F]"
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

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Itens disponíveis
          </h1>

          <p className="mt-2 text-gray-600">
            Encontre itens para reutilizar, trocar ou solicitar.
          </p>
        </div>

        <form method="GET" className="mb-8">
          <div className="flex flex-col gap-4 md:flex-row">
            <BuscaItens busca={busca} categoria={categoria} />

            {categoria && (
              <input
                type="hidden"
                name="categoria"
                value={categoria}
              />
            )}

            <button
              type="submit"
              className="rounded-xl bg-[#0D5C3F] px-6 py-3 font-semibold text-white transition hover:bg-[#0a4932]"
            >
              Buscar
            </button>
          </div>
        </form>

        <div className="mb-8 flex flex-wrap gap-3">
          <Link
            href={
              busca
                ? `/itens?busca=${encodeURIComponent(busca)}`
                : "/itens"
            }
            className={
              !categoria
                ? "rounded-full bg-[#0D5C3F] px-5 py-2 text-sm font-medium text-white"
                : "rounded-full border border-gray-300 bg-white px-5 py-2 text-sm font-medium text-gray-700 transition hover:border-[#0D5C3F] hover:text-[#0D5C3F]"
            }
          >
            Todos
          </Link>

          {categorias.map((cat) => {
            const queryBusca = busca
              ? `&busca=${encodeURIComponent(busca)}`
              : "";

            return (
              <Link
                key={cat.id}
                href={`/itens?categoria=${encodeURIComponent(cat.nome)}${queryBusca}`}
                className={
                  categoria === cat.nome
                    ? "rounded-full bg-[#0D5C3F] px-5 py-2 text-sm font-medium text-white"
                    : "rounded-full border border-gray-300 bg-white px-5 py-2 text-sm font-medium text-gray-700 transition hover:border-[#0D5C3F] hover:text-[#0D5C3F]"
                }
              >
                {cat.nome}
              </Link>
            );
          })}
        </div>

        {itens.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center">
            <div className="text-5xl" aria-hidden="true">
              🔎
            </div>

            <h2 className="mt-4 text-xl font-semibold text-gray-900">
              Nenhum item encontrado
            </h2>

            <p className="mx-auto mt-2 max-w-md text-gray-600">
              Tente alterar o termo de busca ou selecionar outra categoria.
            </p>

            <Link
              href="/itens"
              className="mt-6 inline-block rounded-xl bg-[#0D5C3F] px-6 py-3 font-semibold text-white transition hover:bg-[#0a4932]"
            >
              Limpar filtros
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {itens.map((item) => {
              const estaFavoritado = item.favoritos.length > 0;
              const imagem = getImagem(item.nome);

              return (
                <article
                  key={item.id}
                  className="overflow-hidden rounded-2xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="relative h-52 overflow-hidden bg-[#E7E1D8]">
                    {imagem ? (
                      <Image
                        src={imagem}
                        alt={`Foto do produto ${item.nome}`}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <span
                          className="text-7xl"
                          aria-hidden="true"
                        >
                          ♻️
                        </span>
                      </div>
                    )}

                    <form
                      action={async () => {
                        "use server";

                        if (estaFavoritado) {
                          await removerFavorito(item.id);
                        } else {
                          await favoritarItem(item.id);
                        }
                      }}
                      className="absolute right-4 top-4 z-10"
                    >
                      <button
                        type="submit"
                        aria-label={
                          estaFavoritado
                            ? `Remover ${item.nome} dos favoritos`
                            : `Favoritar ${item.nome}`
                        }
                        className={
                          estaFavoritado
                            ? "flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl text-red-500 shadow-sm transition hover:scale-105"
                            : "flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl shadow-sm transition hover:scale-105 hover:text-red-500"
                        }
                      >
                        {estaFavoritado ? "♥" : "♡"}
                      </button>
                    </form>
                  </div>

                  <div className="p-5">
                    <span className="text-sm font-medium text-[#0D5C3F]">
                      {item.categoria.nome}
                    </span>

                    <h2 className="mt-1 text-xl font-semibold text-gray-900">
                      {item.nome}
                    </h2>

                    <p className="mt-2 text-sm text-gray-600">
                      {item.estadoConservacao}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      {item.localizacao}
                    </p>

                    <Link
                      href={`/item/${item.id}`}
                      className="mt-5 block rounded-xl border border-[#0D5C3F] px-4 py-2.5 text-center font-medium text-[#0D5C3F] transition hover:bg-[#0D5C3F] hover:text-white"
                    >
                      Ver produto
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
