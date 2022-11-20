import shortid from "shortid";
import prismaService from "../../common/PrismaService";
import { transferValueDTO, getTransactionsDTO } from "./TransactionDTOS"

class TransactionService { 
    
    async transferValue(transaction: transferValueDTO){
        
        await prismaService.account.update({
            where: {
                id: transaction.debitedAccountId
            },
            data : {
                balance : {
                    decrement: transaction.value
                }
            }
        })

        await prismaService.account.update({
            where: {
                id: transaction.creditedAccountId
            },
            data : {
                balance : {
                    increment: transaction.value
                }
            }
        })

        const id = shortid.generate()
        await prismaService.transaction.create({
            data : {
                id,
                value: transaction.value,
                creditedAccountId: transaction.creditedAccountId,
                debitedAccountId: transaction.debitedAccountId
            }
        })

        return id
    }

    async getTransactions(transaction: getTransactionsDTO) {
        const transactionsFound = await prismaService.transaction.findMany({
            where: {
                OR: [
                    {
                        creditedAccountId: transaction.accountId
                    },
                    {
                        debitedAccountId: transaction.accountId
                    }
                ]
            },
            select: {
                debitedAccount: {
                    select : {
                        user : {
                            select : {
                                username: true
                            }
                        }
                    }
                },
                creditedAccount: {
                    select : {
                        user : {
                            select : {
                                username: true
                            }
                        }
                    }
                },
                value: true,
                createdAt: true
            },
        })

        return transactionsFound
    }
}

export default new TransactionService()