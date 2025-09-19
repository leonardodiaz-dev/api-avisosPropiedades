import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

interface Usuario {
    nombre: string,
    apellidos: string
    contrasena: string
}

async function main() {

    const nombres: Usuario[] = [
        { nombre: "Carlos", apellidos: "Ramírez López", contrasena: "Carlos876!" },
        { nombre: "María", apellidos: "Fernández Soto", contrasena: "Maria35965!" },
        { nombre: "Luis", apellidos: "Gutiérrez Morales", contrasena: "Luis76543!" },
        { nombre: "Ana", apellidos: "Torres Delgado", contrasena: "Ana766513!" },
        { nombre: "Jorge", apellidos: "Castillo Vargas", contrasena: "Jorge9237!" },
        { nombre: "Paola", apellidos: "Reyes Cárdenas", contrasena: "Paola98765!" },
    ];

    await Promise.all(
        nombres.map(async (usuario, i) => {
            const email = `${usuario.nombre.toLowerCase()}.${usuario?.apellidos?.split(" ")[0]?.toLowerCase()}@mail.com`;
            const hashedPassword = await bcrypt.hash(usuario.contrasena, 10);
            return prisma.usuario.create({
                data: {
                    nombre: usuario.nombre,
                    apellidos: usuario.apellidos,
                    email,
                    dni: `${Math.floor(10000000 + Math.random() * 89999999)}`,
                    tipo_usuario: i % 2 === 0 ? "Agente" : "Particular",
                    celular: `9${Math.floor(10000000 + Math.random() * 89999999)}`,
                    contrasena: hashedPassword,
                },
            });
        })
    );


    console.log("Usuarios creados correctamente con nombres reales.");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
