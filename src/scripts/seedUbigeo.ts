import { prisma } from "../lib/prisma";
import departamentosJson from "../json/departamentos.json";
import provinciasJson from "../json/provincias.json";
import distritosJson from "../json/distritos.json";

const provinciasArray = Object.values(provinciasJson).flat();
const distritosArray = Object.values(distritosJson).flat();

async function main() {
  const depMap = new Map<string, number>();
  const provMap = new Map<string, number>();

  await prisma.distrito.deleteMany();
  await prisma.provincia.deleteMany();
  await prisma.departamento.deleteMany();

  for (const dep of departamentosJson) {
    const nuevoDep = await prisma.departamento.create({
      data: { nombre: dep.nombre_ubigeo },
    });
    depMap.set(dep.id_ubigeo, nuevoDep.id_departamento);
  }


  for (const prov of provinciasArray) {
    const departamentoId = depMap.get(prov.id_padre_ubigeo); 
    if (!departamentoId) {
      console.warn(`Departamento no encontrado para provincia: ${prov.nombre_ubigeo}`);
      continue;
    }

    const nuevaProv = await prisma.provincia.create({
      data: {
        nombre: prov.nombre_ubigeo,
        departamentoId,
      },
    });
    provMap.set(prov.id_ubigeo, nuevaProv.id_provincia);
  }

  for (const dist of distritosArray) {
    const provinciaId = provMap.get(dist.id_padre_ubigeo); 
    if (!provinciaId) {
      console.warn(`Provincia no encontrada para distrito: ${dist.nombre_ubigeo}`);
      continue;
    }

    await prisma.distrito.create({
      data: {
        nombre: dist.nombre_ubigeo,
        provinciaId,
      },
    });
  }

  console.log("Ubigeo cargado correctamente");
}

main().catch(console.error);
