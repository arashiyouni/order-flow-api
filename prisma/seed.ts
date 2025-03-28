import { Logger } from '@nestjs/common';
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

}

main()
    .catch((e) => {
        console.error('❌ Error en seed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });