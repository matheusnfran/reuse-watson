
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F4EFE8] flex items-center justify-center px-6">
      <section className="w-full max-w-md bg-white rounded-3xl shadow-lg p-8">

        <div className="mb-8 text-center">
          <div className="flex justify-center">
            <Image
              src="/produtos/reuselogo1.png"
              alt="Logo ReUse"
              width={220}
              height={70}
              priority
              className="h-auto w-[200px] sm:w-[220px]"
            />
          </div>

          <p className="mt-3 text-gray-600">
            Entre na sua conta para continuar.
          </p>
        </div>

        <form className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              E-mail
            </label>

            <input
              id="email"
              type="email"
              placeholder="seuemail@exemplo.com"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#0D5C3F] focus:ring-2 focus:ring-[#0D5C3F]/20"
            />
          </div>

          <div>
            <label
              htmlFor="senha"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Senha
            </label>

            <input
              id="senha"
              type="password"
              placeholder="Digite sua senha"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#0D5C3F] focus:ring-2 focus:ring-[#0D5C3F]/20"
            />
          </div>

          <Link
            href="/itens"
            className="block w-full rounded-xl bg-[#0D5C3F] py-3 text-center font-semibold text-white transition hover:bg-[#0a4932]"
          >
            Entrar
          </Link>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Ainda não tem uma conta?{" "}
          <button
            type="button"
            className="font-semibold text-[#0D5C3F] hover:underline"
          >
            Cadastre-se
          </button>
        </p>

      </section>
    </main>
  );
}
