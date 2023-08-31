// import { PrismaClient } from "@prisma/client"
import {prisma} from '../../../db'


export default function handler(req, res) {
    // const prisma = new PrismaClient()
    const {userID} = req.query
    const {method} = req
    const main = async () => {
        if(method === 'PUT'){
            const body = JSON.parse(req.body)
            await prisma.users.update({
                where: {
                    id: Number(userID)
                },
                data: {
                    FirstName: body.FirstName,
                    LastName: body.LastName
                }
            })
            await prisma.expenses.updateMany({
                where: {
                    userID: Number(userID)
                },
                data: {
                    FullName: body.FirstName + ' ' + body.LastName
                }
            })
            res.status(200)

        }else if(method === 'DELETE'){
            const req1 = prisma.users.delete({
                where:{
                    id: Number(userID)
                }
            })

            //
            const req2 = prisma.expenses.deleteMany({
                where:{
                    userID: Number(userID)
                }
            })
            await Promise.all([req1, req2])
            res.status(200)
        }else{
            const getUser = await prisma.users.findUnique({
                where: {
                    id: Number(userID)
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

