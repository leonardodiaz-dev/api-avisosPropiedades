import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

async function main() {
    const usuarios = await prisma.usuario.findMany();
    const distritos = await prisma.distrito.findMany();
    const tiposPropiedad = await prisma.tipo_Propiedad.findMany();
    const caracteristicas = await prisma.caracteristica.findMany();

    if (!usuarios.length) throw new Error("No hay usuarios. Corre primero seedUsuarios.ts");

    const uploadsDir = path.join(__dirname, "../../uploads");
    const imagenes = fs.existsSync(uploadsDir) ? fs.readdirSync(uploadsDir) : [];

    const titulos: string[] = [
        "Departamento moderno en Miraflores",
        "Casa con jardín en San Borja",
        "Penthouse de lujo en San Isidro",
        "Casa de campo en Chaclacayo",
        "Mini departamento en Surco",
        "Oficina céntrica en Lima",
        "Casa familiar en La Molina",
        "Terreno amplio en Pachacamac",
        "Duplex exclusivo en Barranco",
        "Loft minimalista en Magdalena",
        "Apartamento con vista al mar en Chorrillos",
        "Local comercial en el centro histórico",
        "Casa de playa en Asia",
        "Almacén industrial en el Callao",
        "Terreno agrícola en Huaral",
        "Casa de veraneo en Cieneguilla",
        "Oficina pequeña en Miraflores",
        "Mini-tienda en Gamarra",
        "Edificio de departamentos en construcción",
        "Casa histórica en el Centro de Lima",
        "Solar en Villa El Salvador",
        "Departamento céntrico en Lince",
        "Local para restaurante en San Miguel",
        "Cochera en Surco",
        "Apartamento estudio en San Isidro",
        "Casa adosada en La Molina",
        "Terreno en la selva en Iquitos",
        "Hotel boutique en Cusco",
        "Fundo rural en Cañete",
        "Departamento con balcón en Pueblo Libre"
    ];

    const direcciones: string[] = [
        "Av. Larco 1234, Miraflores",
        "Calle San Martín 567",
        "Jirón Puno 890",
        "Av. El Sol 456",
        "Calle Grau 789",
        "Jirón Bolognesi 101",
        "Av. Amazonas 234",
        "Calle Dos de Mayo 321",
        "Av. La Marina 654",
        "Jirón Arequipa 567",
        "Calle Ayacucho 876",
        "Jr. Junín 987",
        "Av. Garcilaso de la Vega 1200",
        "Calle Real 432",
        "Jirón Moquegua 1010",
        "Av. Ricardo Palma 555",
        "Jirón Huancavelica 777",
        "Av. Miguel Grau 900",
        "Calle Cusco 222",
        "Jirón San Marcos 333"
    ];

    const tituloToTipo: Record<string, string> = {
        "Departamento moderno en Miraflores": "Departamentos",
        "Casa con jardín en San Borja": "Casas",
        "Penthouse de lujo en San Isidro": "Departamentos",
        "Casa de campo en Chaclacayo": "Casas",
        "Mini departamento en Surco": "Departamentos",
        "Oficina céntrica en Lima": "Oficinas y consultorios",
        "Casa familiar en La Molina": "Casas",
        "Terreno amplio en Pachacamac": "Terrenos",
        "Duplex exclusivo en Barranco": "Departamentos",
        "Loft minimalista en Magdalena": "Departamentos",
        "Apartamento con vista al mar en Chorrillos": "Departamentos",
        "Local comercial en el centro histórico": "Locales",
        "Casa de playa en Asia": "Casas",
        "Almacén industrial en el Callao": "Depósitos",
        "Terreno agrícola en Huaral": "Terrenos",
        "Casa de veraneo en Cieneguilla": "Casas",
        "Oficina pequeña en Miraflores": "Oficinas y consultorios",
        "Mini-tienda en Gamarra": "Locales",
        "Edificio de departamentos en construcción": "Departamentos",
        "Casa histórica en el Centro de Lima": "Casas",
        "Solar en Villa El Salvador": "Terrenos",
        "Departamento céntrico en Lince": "Departamentos",
        "Local para restaurante en San Miguel": "Locales",
        "Cochera en Surco": "Parqueaderos",
        "Apartamento estudio en San Isidro": "Departamentos",
        "Casa adosada en La Molina": "Casas",
        "Terreno en la selva en Iquitos": "Terrenos",
        "Hotel boutique en Cusco": "Locales",
        "Fundo rural en Cañete": "Terrenos",
        "Departamento con balcón en Pueblo Libre": "Departamentos",
    };

    const descripciones: string[] = [
        "Un espacio moderno con acabados de primera y excelente iluminación.",
        "Casa ideal para familias con amplio jardín y área de BBQ.",
        "Penthouse con vista panorámica y terraza privada.",
        "Casa de campo rodeada de naturaleza y aire puro.",
        "Mini departamento funcional cerca de universidades.",
        "Oficina ubicada en el corazón financiero de la ciudad.",
        "Casa familiar de dos pisos con piscina y estacionamiento.",
        "Terreno amplio para construcción en zona tranquila.",
        "Duplex exclusivo con diseño vanguardista.",
        "Loft minimalista con ambientes abiertos y modernos.",
        "Apartamento con balcón y espectaculares vistas al mar.",
        "Local listo para iniciar tu negocio en una zona de alto tránsito.",
        "Casa de playa ideal para escapadas de fin de semana.",
        "Almacén con gran altura y fácil acceso para camiones.",
        "Terreno fértil con acceso a agua para agricultura.",
        "Casa con piscina y grandes áreas verdes para relajarse.",
        "Oficina ideal para emprendedores, con excelente ubicación.",
        "Pequeña tienda en el corazón comercial de la ciudad.",
        "Edificio de varios pisos en venta para inversionistas.",
        "Casa con valor histórico y arquitectura colonial, perfecta para restauración.",
        "Terreno en desarrollo urbano con servicios básicos cerca.",
        "Departamento funcional y bien conectado con transporte público.",
        "Local en zona comercial de alta demanda para gastronomía.",
        "Cochera privada en un edificio residencial, ideal para asegurar tu vehículo.",
        "Apartamento compacto, perfecto para una persona o pareja.",
        "Casa adosada con diseño moderno y espacios bien distribuidos.",
        "Terreno virgen en la Amazonía, ideal para eco-turismo o proyectos sostenibles.",
        "Hotel con encanto en el centro de la ciudad imperial, listo para operar.",
        "Extenso terreno agrícola, ideal para cultivo o ganadería.",
        "Departamento con vista a parque, perfecto para disfrutar de la tranquilidad."
    ];

    function slugify(text: string): string {
        return text
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9-]/g, "")
            .replace(/-+/g, "-")
            .replace(/^-+|-+$/g, "");
    }

    function pickOne<T>(arr: T[]): T {
        return arr[Math.floor(Math.random() * arr.length)]!;
    }

    function sample<T>(arr: T[], n: number): T[] {
        const copy = [...arr];
        const out: T[] = [];
        const max = Math.min(n, copy.length);
        for (let i = 0; i < max; i++) {
            const idx = Math.floor(Math.random() * copy.length);
            out.push(copy[idx]!);
            copy.splice(idx, 1);
        }
        return out;
    }

    await Promise.all(
        titulos.map(async (titulo, i) => {
            const usuarioRandom = pickOne(usuarios);
            const distritoRandom = pickOne(distritos);
            const direccionRandom = pickOne(direcciones);

            const tipoNombre = tituloToTipo[titulo];
            const tipoPropiedad = tiposPropiedad.find(
                (t) => t.nombre === tipoNombre
            );

            if (!tipoPropiedad) {
                throw new Error(`No se encontró tipo para el título: ${titulo}`);
            }

            const propiedad = await prisma.propiedad.create({
                data: {
                    titulo,
                    slug: slugify(titulo),
                    descripcion: descripciones[i] ?? "",
                    precio: Math.floor(80000 + Math.random() * 500000),
                    direccion: direccionRandom,
                    area_construida: Math.floor(60 + Math.random() * 200),
                    area_total: Math.floor(70 + Math.random() * 300),
                    antiguedad: Math.floor(Math.random() * 40),
                    dormitorios: tipoPropiedad.nombre !== 'Terreno' ? Math.floor(1 + Math.random() * 5) : 0,
                    banos: tipoPropiedad.nombre !== 'Terreno' ? Math.floor(1 + Math.random() * 4) : 0,
                    tipo_moneda: Math.random() > 0.5 ? "Soles" : "Dolares",
                    tipo_operacion: Math.random() > 0.5 ? "Venta" : "Alquiler",
                    usuarioId: usuarioRandom.id_usuario,
                    distritoId: distritoRandom.id_distrito,
                    tipoPropiedadId: tipoPropiedad.id_tipoPropiedad,
                },
            });

            const randomImgs = sample(imagenes, 3);
            const randomCars = sample(caracteristicas, 4);

            await Promise.all([
                ...randomImgs.map((img) =>
                    prisma.imagen.create({
                        data: { url: `/uploads/${img}`, propiedadId: propiedad.id_propiedad },
                    })
                ),
                ...randomCars.map((car) =>
                    prisma.caracteristicaPropiedad.create({
                        data: {
                            propiedadId: propiedad.id_propiedad,
                            caracteristicaId: car.id_caracteristica,
                        },
                    })
                ),
            ]);
        })
    );


    console.log("✅ Propiedades creadas con datos variados.");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
