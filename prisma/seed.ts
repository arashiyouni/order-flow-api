import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    const hashedPassword = await bcrypt.hash('admin123', 10)
    const user = await prisma.user.create({
        data: {
            email: 'admin@boxful.com',
            username: 'admin',
            password: hashedPassword,
            role: 'ADMIN',
        },
    });

    const state = await prisma.state.createMany({
        data: [
            { name: 'Ahuachapán' },
            { name: 'Santa Ana' },
            { name: 'San Salvador' },
        ]
    });

    const city = await prisma.city.createMany({
        data: [
            { name: 'Apaneca' },
            { name: 'Metapán' },
            { name: 'Antiguo Cuscatlán' },
        ],
    });

    const newOrder = await prisma.order.create({
        data: {
            scheduleDeliveryDate: new Date('2025-04-01T14:00:00.000Z'),
            name: 'Angie',
            lastname: 'Espinoza',
            email: 'angie@example.com',
            phone: '+53123456789',
            deliveryAddress: 'Av. Reforma 123',
            state: 'San Salvador',
            city: 'San Salvador',
            instructions: 'Llamar al llegar',

            OrderPerUser: {
                create: [
                    {
                        weight: 10,
                        length: 40,
                        height: 20,
                        width: 30,
                        description: 'Caja con libros',
                    },
                    {
                        weight: 7.5,
                        length: 35,
                        height: 25,
                        width: 20,
                        description: 'Maleta con ropa',
                    },
                ],
            },
        },
        include: {
            OrderPerUser: true,
        },
    });
}

main()
    .catch((e) => {
        console.error('❌ Error en seed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });