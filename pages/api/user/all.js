import { PrismaClient } from "@prisma/client"


export default function handler(req, res) {
    const prisma = new PrismaClient()

    const main = async () => {
        const allUsers = await prisma.users.findMany()
        // const customJson = JSON.stringify(
        //     allUsers,
        //     (key, value) => (typeof value === 'bigint' ? value.toString() : value) // return everything else unchanged
        // )
    
        res.status(200)
        // .json(JSON.parse(allUsers))
    }

    main()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (error) => {
            console.error(error)
            await prisma.$disconnect()
            process.exit(1)
        })

}

