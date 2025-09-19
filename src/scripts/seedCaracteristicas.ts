import { prisma } from "../lib/prisma";

async function main() {
 
  await prisma.caracteristicaPropiedad.deleteMany();
  await prisma.caracteristica.deleteMany();
  
  const caracteristicas = [
    "Cocina equipada",
    "Amoblado",
    "Piscina",
    "Área de BBQ",
    "Jardín",
    "Seguridad 24h",
    "Ascensor",
    "Gimnasio",
    "Terraza",
    "Estacionamiento",
  ];

  for (const car of caracteristicas) {
    await prisma.caracteristica.create({
      data: { nombre: car },
    });
  }

  console.log("Características cargados correctamente 🚀");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
