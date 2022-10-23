import { PrismaClient } from "@prisma/client"

export default function handler(req, res) {
    const prisma = new PrismaClient()

    const main = async () => {
        const body = JSON.parse(req.body)
        await prisma.users.update({
            where: {
                id: BigInt(body.userID)
            },
            data: {
                TotalExpense: Number(body.Cost)
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

