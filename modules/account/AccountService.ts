import prismaService from "../../common/PrismaService";
import { GetAccountByIdDTO } from "./AccountDTOS";

class AccountService {
    async getAccountById(account: GetAccountByIdDTO) {
        const accountFound = prismaService.account.findFirst({
            where: {
                id: account.accountId
            }
        })


        return accountFound
    }
}

export default new AccountService()