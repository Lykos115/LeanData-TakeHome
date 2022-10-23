import { PrismaClient } from "@prisma/client"

export default function handler(req, res) {
    const prisma = new PrismaClient()

    const main = async () => {
        const body = JSON.parse(req.body)
        await prisma.expenses.create({
            data: {
                FullName: body.FullName,
                Category: body.Category,
                Description: body.Description,
                Cost: Number(body.Cost),
                userID: Number(body.userID)
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



