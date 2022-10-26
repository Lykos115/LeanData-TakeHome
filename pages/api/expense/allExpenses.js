// import { PrismaClient } from "@prisma/client"
import { prisma } from '../../../db'

export default function handler(req, res) {
    // const prisma = new PrismaClient()

    const main = async () => {
        const allExpenses = await prisma.expenses.findMany({
            orderBy: {
                id: "desc"
            }
        })
        const customJson = JSON.stringify(
            allExpenses,
            (key, value) => (typeof value === 'bigint' ? value.toString() : value) // return everything else unchanged
        )
    
        res.status(200).json(JSON.parse(customJson))
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

