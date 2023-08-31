const { PrismaClient } = require('@prisma/client')
const { faker } =  require('@faker-js/faker');


const prisma = new PrismaClient();
async function main () {
    let users = []
    for(let i = 0; i < 1000; i++){
        const user = {FirstName: faker.name.firstName(), LastName: faker.name.lastName()}
        users.push(user)
    }

    const addUsers = async () => {
        await prisma.users.createMany({data: users})
    }

    addUsers()
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
