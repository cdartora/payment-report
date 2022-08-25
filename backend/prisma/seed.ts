import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  await prisma.user.create({
    data: {
      name: 'Érica',
      email: 'erica@mail.com',
      password: '$2a$12$cEoKxFeC89HFIoTFZXao/uo3RV7FOnPiMsV2kJxHEQ89fQQZ8bORi' // secret_admin
    }
  });

  await prisma.user.create({
    data: {
      name: 'Admin',
      email: 'admin@mail.com',
      password: ' $2a$12$TziN6uzS6hDlRklc7Yk0yeLPaTHSxVV0VVLyWZm1UAteqFF.pW8/S ' // admin
    }
  });

  const joao = await prisma.client.create({
    data: {
      name: 'João',
    }
  });

  const maria = await prisma.client.create({
    data: {
      name: 'Maria',
    }
  });

  const robson = await prisma.client.create({
    data: {
      name: 'Robson',
    }
  });

  await prisma.appointment.create({
    data: {
      clientId: joao.id,
      value: 1122.00,
      installments: 5,
      isPaid: false
    }
  });

  await prisma.appointment.create({
    data: {
      clientId: maria.id,
      value: 5013.00,
      installments: 10,
      isPaid: false
    }
  });

  await prisma.appointment.create({
    data: {
      clientId: robson.id,
      value: 502.00,
      installments: 3,
      isPaid: false
    }
  });

  console.log("banco de dados populado!")
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })