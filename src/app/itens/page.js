import Link from "next/link";

const itens = [
  {
    id: 1,
    nome: "Cadeira de Escritório",
    categoria: "Móveis",
    estado: "Bom estado",
    localizacao: "São Paulo, SP",
    emoji: "🪑",
  },
  {
    id: 2,
    nome: "Notebook",
    categoria: "Eletrônicos",
    estado: "Usado",
    localizacao: "São Paulo, SP",
    emoji: "💻",
  },
  {
    id: 3,
    nome: "Livro de Design",
    categoria: "Livros",
    estado: "Ótimo estado",
    localizacao: "Osasco, SP",
    emoji: "📚",
  },
  {
    id: 4,
    nome: "Jaqueta Jeans",
    categoria: "Roupas",
    estado: "Bom estado",
    localizacao: "Barueri, SP",
    emoji: "👕",
  },
  {
    id: 5,
    nome: "Luminária de Mesa",
    categoria: "Móveis",
    estado: "Ótimo estado",
    localizacao: "São Paulo, SP",
    emoji: "💡",
  },
  {
    id: 6,
    nome: "Fone de Ouvido",
    categoria: "Eletrônicos",
    estado: "Bom estado",
    localizacao: "Guarulhos, SP",
    emoji: "🎧",
  },
];

const categorias = ["Todos", "Eletrônicos", "Roupas", "Móveis", "Livros"];

export default function ItensPage() {
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

        <div className="mb-6">
          <input
            type="search"
            placeholder="Buscar itens..."
            className="w-full rounded-xl border border-gray-300 bg-white px-5 py-3 outline-none transition focus:border-[#0D5C3F] focus:ring-2 focus:ring-[#0D5C3F]/20"
          />
        </div>

        <div className="mb-8 flex flex-wrap gap-3">
          {categorias.map((categoria, index) => (
            <button
              key={categoria}
              className={
                index === 0
                  ? "rounded-full bg-[#0D5C3F] px-5 py-2 text-sm font-medium text-white"
                  : "rounded-full border border-gray-300 bg-white px-5 py-2 text-sm font-medium text-gray-700 transition hover:border-[#0D5C3F] hover:text-[#0D5C3F]"
              }
            >
              {categoria}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {itens.map((item) => (
            <article
              key={item.id}
              className="overflow-hidden rounded-2xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="relative flex h-52 items-center justify-center bg-[#E7E1D8]">
                <span className="text-7xl">{item.emoji}</span>

                <button
                  aria-label={`Favoritar ${item.nome}`}
                  className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl shadow-sm transition hover:text-red-500"
                >
                  ♡
                </button>
              </div>

              <div className="p-5">
                <span className="text-sm font-medium text-[#0D5C3F]">
                  {item.categoria}
                </span>

                <h2 className="mt-1 text-xl font-semibold text-gray-900">
                  {item.nome}
                </h2>

                <p className="mt-2 text-sm text-gray-600">
                  {item.estado}
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
          ))}
        </div>
      </section>
    </main>
  );
}