import Link from "next/link";

export default function FavoritosPage() {
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
      </section>
    </main>
  );
}