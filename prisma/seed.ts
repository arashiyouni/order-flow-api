import { Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    await prisma.$connect();
    Logger.debug('🔌 | Connection in Prisma ✅');

    const hashedPassword = await bcrypt.hash('admin123', 10)
    const user = await prisma.user.create({
        data: {
            email: 'admin@boxful.com',
            username: 'admin',
            password: hashedPassword,
            role: 'ADMIN',
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