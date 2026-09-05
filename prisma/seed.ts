import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.favorito.deleteMany();
  await prisma.item.deleteMany();
  await prisma.categoria.deleteMany();
  await prisma.usuario.deleteMany();

  const moveis = await prisma.categoria.create({
    data: { nome: "Móveis" },
  });

  const eletronicos = await prisma.categoria.create({
    data: { nome: "Eletrônicos" },
  });

  const livros = await prisma.categoria.create({
    data: { nome: "Livros" },
  });

  const roupas = await prisma.categoria.create({
    data: { nome: "Roupas" },
  });

  const mariana = await prisma.usuario.create({
    data: {
      nome: "Mariana Silva",
      email: "mariana@reuse.com",
      senha: "123456",
    },
  });

  const carlos = await prisma.usuario.create({
    data: {
      nome: "Carlos Oliveira",
      email: "carlos@reuse.com",
      senha: "123456",
    },
  });

  const ana = await prisma.usuario.create({
    data: {
      nome: "Ana Souza",
      email: "ana@reuse.com",
      senha: "123456",
    },
  });

  const lucas = await prisma.usuario.create({
    data: {
      nome: "Lucas Santos",
      email: "lucas@reuse.com",
      senha: "123456",
    },
  });

  const fernanda = await prisma.usuario.create({
    data: {
      nome: "Fernanda Lima",
      email: "fernanda@reuse.com",
      senha: "123456",
    },
  });

  const rafael = await prisma.usuario.create({
    data: {
      nome: "Rafael Costa",
      email: "rafael@reuse.com",
      senha: "123456",
    },
  });

  await prisma.item.createMany({
    data: [
      {
        nome: "Cadeira de Escritório",
        descricao:
          "Cadeira de escritório confortável e bem conservada, ideal para home office.",
        estadoConservacao: "Bom estado",
        localizacao: "São Paulo, SP",
        usuarioId: mariana.id,
        categoriaId: moveis.id,
      },
      {
        nome: "Notebook",
        descricao:
          "Notebook usado e funcionando normalmente, ideal para estudos e tarefas do dia a dia.",
        estadoConservacao: "Usado",
        localizacao: "São Paulo, SP",
        usuarioId: carlos.id,
        categoriaId: eletronicos.id,
      },
      {
        nome: "Livro de Design",
        descricao:
          "Livro sobre design em ótimo estado, com conteúdo voltado para criatividade e projetos visuais.",
        estadoConservacao: "Ótimo estado",
        localizacao: "Osasco, SP",
        usuarioId: ana.id,
        categoriaId: livros.id,
      },
      {
        nome: "Jaqueta Jeans",
        descricao:
          "Jaqueta jeans em bom estado, pouco utilizada e pronta para um novo dono.",
        estadoConservacao: "Bom estado",
        localizacao: "Barueri, SP",
        usuarioId: lucas.id,
        categoriaId: roupas.id,
      },
      {
        nome: "Luminária de Mesa",
        descricao:
          "Luminária de mesa em ótimo estado, ideal para estudos, leitura ou home office.",
        estadoConservacao: "Ótimo estado",
        localizacao: "São Paulo, SP",
        usuarioId: fernanda.id,
        categoriaId: moveis.id,
      },
      {
        nome: "Fone de Ouvido",
        descricao:
          "Fone de ouvido em bom estado e funcionando normalmente.",
        estadoConservacao: "Bom estado",
        localizacao: "Guarulhos, SP",
        usuarioId: rafael.id,
        categoriaId: eletronicos.id,
      },
    ],
  });

  console.log("Banco ReUse populado com sucesso!");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });