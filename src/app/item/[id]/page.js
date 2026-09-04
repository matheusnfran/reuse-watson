import Link from "next/link";

const itens = [
  {
    id: 1,
    nome: "Cadeira de Escritório",
    categoria: "Móveis",
    estado: "Bom estado",
    localizacao: "São Paulo, SP",
    emoji: "🪑",
    descricao:
      "Cadeira de escritório confortável e em bom estado de conservação. Possui pequenos sinais de uso, mas está funcionando perfeitamente.",
    usuario: "Mariana Silva",
  },
  {
    id: 2,
    nome: "Notebook",
    categoria: "Eletrônicos",
    estado: "Usado",
    localizacao: "São Paulo, SP",
    emoji: "💻",
    descricao:
      "Notebook usado e funcionando normalmente. Ideal para estudos, tarefas do dia a dia e navegação na internet.",
    usuario: "Carlos Oliveira",
  },
  {
    id: 3,
    nome: "Livro de Design",
    categoria: "Livros",
    estado: "Ótimo estado",
    localizacao: "Osasco, SP",
    emoji: "📚",
    descricao:
      "Livro sobre fundamentos de design, conservado e sem páginas rasgadas ou anotações.",
    usuario: "Ana Souza",
  },
  {
    id: 4,
    nome: "Jaqueta Jeans",
    categoria: "Roupas",
    estado: "Bom estado",
    localizacao: "Barueri, SP",
    emoji: "👕",
    descricao:
      "Jaqueta jeans em bom estado, pouco utilizada e sem manchas ou rasgos.",
    usuario: "Lucas Santos",
  },
  {
    id: 5,
    nome: "Luminária de Mesa",
    categoria: "Móveis",
    estado: "Ótimo estado",
    localizacao: "São Paulo, SP",
    emoji: "💡",
    descricao:
      "Luminária de mesa em ótimo estado e funcionando normalmente.",
    usuario: "Fernanda Lima",
  },
  {
    id: 6,
    nome: "Fone de Ouvido",
    categoria: "Eletrônicos",
    estado: "Bom estado",
    localizacao: "Guarulhos, SP",
    emoji: "🎧",
    descricao:
      "Fone de ouvido em bom estado de conservação, com funcionamento normal.",
    usuario: "Rafael Costa",
  },
];

export default async function ProdutoPage({ params }) {
  const { id } = await params;

  const item = itens.find((item) => item.id === Number(id));

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
              className="font-medium text-gray-600 hover:text-[#0D5C3F]"
            >
              Itens
            </Link>

            <Link
              href="/favoritos"
              className="font-medium text-gray-600 hover:text-[#0D5C3F]"
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
          <div className="flex min-h-[420px] items-center justify-center bg-[#E7E1D8]">
            <span className="text-9xl">{item.emoji}</span>
          </div>

          <div className="p-8 md:p-10">
            <span className="font-medium text-[#0D5C3F]">
              {item.categoria}
            </span>

            <h1 className="mt-2 text-3xl font-bold text-gray-900">
              {item.nome}
            </h1>

            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-full bg-[#F4EFE8] px-4 py-2 text-sm text-gray-700">
                {item.estado}
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
                {item.usuario}
              </p>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <button className="rounded-xl border border-[#0D5C3F] px-5 py-3 font-semibold text-[#0D5C3F] transition hover:bg-[#0D5C3F]/5">
                Tenho interesse
              </button>

              <button className="rounded-xl bg-[#0D5C3F] px-5 py-3 font-semibold text-white transition hover:bg-[#0a4932]">
                Trocar / Solicitar
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}