import { prisma } from "../lib/prisma";

async function main() {
  
  await prisma.tipo_Propiedad.deleteMany();

  const tiposPropiedad = [
    "Departamentos",
    "Casas",
    "Depósitos",
    "Locales",
    "Terrenos",
    "Parqueaderos",
    "Oficinas y consultorios",
  ];

  for (const tipo of tiposPropiedad) {
    await prisma.tipo_Propiedad.create({
      data: { nombre: tipo },
    });
  }

  console.log("Tipos de propiedad cargados correctamente 🚀");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
