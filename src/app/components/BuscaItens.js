
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function BuscaItens({ busca, categoria }) {
  const router = useRouter();
  const [texto, setTexto] = useState(busca || "");

  useEffect(() => {
    setTexto(busca || "");
  }, [busca]);

  useEffect(() => {
    if (texto === (busca || "")) {
      return;
    }

    const temporizador = setTimeout(() => {
      const params = new URLSearchParams();

      if (texto.trim()) {
        params.set("busca", texto.trim());
      }

      if (categoria) {
        params.set("categoria", categoria);
      }

      const query = params.toString();
      const destino = query ? `/itens?${query}` : "/itens";

      router.replace(destino, { scroll: false });
    }, 300);

    return () => clearTimeout(temporizador);
  }, [texto, busca, categoria, router]);

  return (
    <input
      type="search"
      name="busca"
      value={texto}
      placeholder="Buscar itens..."
      aria-label="Buscar itens"
      onChange={(event) => setTexto(event.target.value)}
      className="w-full rounded-xl border border-gray-300 bg-white px-5 py-3 outline-none transition focus:border-[#0D5C3F] focus:ring-2 focus:ring-[#0D5C3F]/20"
    />
  );
}
