import Link from "next/link";
import prisma from "@/lib/prisma";
import { removerFavorito } from "@/app/actions/favoritos";

const USUARIO_TESTE_ID = 1;

function getEmoji(nome) {
  const emojis = {
    "Cadeira de Escritório": "🪑",
    Notebook: "💻",
    "Livro de Design": "📚",
    "Jaqueta Jeans": "👕",
    "Luminária de Mesa": "💡",
    "Fone de Ouvido": "🎧",
  };

  return emojis[nome] || "♻️";
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
          <Link href="/itens" className="text-3xl font-bold text-[#0D5C3F]">
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
            <div className="text-5xl text-[#0D5C3F]">♡</div>

            <h2 className="mt-4 text-xl font-semibold text-gray-900">
              Nenhum item favoritado
            </h2>

            <p className="mx-auto mt-2 max-w-md text-gray-600">
              Explore os itens disponíveis e clique no coração para salvar os que
              mais interessarem a você.
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

              return (
                <article
                  key={favorito.id}
                  className="overflow-hidden rounded-2xl bg-white shadow-sm"
                >
                  <div className="flex h-52 items-center justify-center bg-[#E7E1D8]">
                    <span className="text-7xl">{getEmoji(item.nome)}</span>
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