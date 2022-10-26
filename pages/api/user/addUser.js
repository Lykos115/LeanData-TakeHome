// import { PrismaClient } from "@prisma/client"
import { prisma } from '../../../db'

export default function handler(req, res) {
    // const prisma = new PrismaClient()

    const main = async () => {
        const body = JSON.parse(req.body)
        await prisma.users.create({
            data: {
                FirstName: body.FirstName,
                LastName: body.LastName
            }
        })
        res.status(200)
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

