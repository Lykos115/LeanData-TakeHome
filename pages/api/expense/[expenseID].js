import { PrismaClient } from "@prisma/client"


export default function handler(req, res) {
    const prisma = new PrismaClient()
    const {expenseID} = req.query
    const {method} = req
    const main = async () => {
        if(method === 'PUT'){
            const body = JSON.parse(req.body)
            await prisma.expenses.update({
                where: {
                    id: BigInt(expenseID)
                },
                data: {
                    Category: body.Category.category,
                    Description: body.Description,
                    Cost: parseFloat(body.Cost)
                }
            })
            res.status(200)

        }else if(method === 'DELETE'){
            await prisma.expenses.delete({
                where:{
                    id: BigInt(expenseID)
                }
            })
            res.status(200)
        }else{
            const getUser = await prisma.expenses.findUnique({
                where: {
                    id: Number(expenseID)
                }
            })
            const customJson = JSON.stringify(
                getUser,
                (key, value) => (typeof value === 'bigint' ? value.toString() : value) // return everything else unchanged
            )
        
            res.status(200).json(JSON.parse(customJson))
        }
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

