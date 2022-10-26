import {prisma} from '../../../../db'


export default function handler(req, res) {
    const {userID} = req.query

    const main = async () => {
        const userExpenses = await prisma.expenses.findMany({
            where: {
                userID: Number(userID)
            }
        })

        const customJson = JSON.stringify(
            userExpenses,
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