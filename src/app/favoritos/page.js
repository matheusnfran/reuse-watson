
import Link from "next/link";
import Image from "next/image";
import prisma from "@/lib/prisma";
import { removerFavorito } from "@/app/actions/favoritos";

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

export default async function FavoritosPage() {
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

  return (
    <main className="min-h-screen bg-[#F4EFE8]">
      <header className="border-b border-black/5 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link
            href="/itens"
            aria-label="ReUse - Ir para itens disponíveis"
            className="flex items-center"
          >
            <Image
              src="/produtos/reuselogo1.png"
              alt="Logo ReUse"
              width={190}
              height={55}
              priority
              className="h-auto w-[150px] sm:w-[190px]"
            />
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
              className="font-medium text-[#0D5C3F]"
            >
              ♥ Favoritos
            </Link>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Meus favoritos
          </h1>

          <p className="mt-2 text-gray-600">
            Os itens que você favoritar aparecerão aqui.
          </p>
        </div>

        {favoritos.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center">
            <div
              className="text-5xl text-[#0D5C3F]"
              aria-hidden="true"
            >
              ♡
            </div>

            <h2 className="mt-4 text-xl font-semibold text-gray-900">
              Nenhum item favoritado
            </h2>

            <p className="mx-auto mt-2 max-w-md text-gray-600">
              Explore os itens disponíveis e clique no coração
              para salvar os que mais interessarem a você.
            </p>

            <Link
              href="/itens"
              className="mt-6 inline-block rounded-xl bg-[#0D5C3F] px-6 py-3 font-semibold text-white transition hover:bg-[#0a4932]"
            >
              Explorar itens
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {favoritos.map((favorito) => {
              const item = favorito.item;
              const imagem = getImagem(item.nome);

              return (
                <article
                  key={favorito.id}
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

                    <div className="mt-5 grid gap-3">
                      <Link
                        href={`/item/${item.id}`}
                        className="block rounded-xl border border-[#0D5C3F] px-4 py-2.5 text-center font-medium text-[#0D5C3F] transition hover:bg-[#0D5C3F] hover:text-white"
                      >
                        Ver produto
                      </Link>

                      <form
                        action={async () => {
                          "use server";
                          await removerFavorito(item.id);
                        }}
                      >
                        <button
                          type="submit"
                          aria-label={`Remover ${item.nome} dos favoritos`}
                          className="w-full rounded-xl bg-[#0D5C3F] px-4 py-2.5 font-medium text-white transition hover:bg-[#0a4932]"
                        >
                          Remover dos favoritos
                        </button>
                      </form>
                    </div>
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
