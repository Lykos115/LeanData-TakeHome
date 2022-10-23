import { PrismaClient } from "@prisma/client"


export default function handler(req, res) {
    // const prisma = new PrismaClient()

    // const main = async () => {
    //     const allExpenses = await prisma.expenses.findMany()
    //     const customJson = JSON.stringify(
    //         allExpenses,
    //         (key, value) => (typeof value === 'bigint' ? value.toString() : value) // return everything else unchanged
    //     )
    //     console.log(customJson)
    
    //     res.status(200)
    //     // .json(JSON.parse(allExpenses))
    // }

    // main()
    //     .then(async () => {
    //         await prisma.$disconnect()
    //     })
    //     .catch(async (error) => {
    //         console.error(error)
    //         await prisma.$disconnect()
    //         process.exit(1)
    //     })
     const expenses = [
        {id:1, FullName: "Francisco Herrera", Category: "Food", Description: "Team lunch", Cost:40.00}
    ]


    if(req.method === 'POST'){
        const body = JSON.parse(req.body)
        expenses.push({id: expenses[expenses.length - 1].id + 1, FullName: body.FullName, Category: body.Category, Description: body.Description, Cost: body.Cost})
        res.status(200).json(JSON.parse(JSON.stringify(expenses)))
    }else{
        res.status(200).json(JSON.parse(JSON.stringify(expenses)))
    }

}

