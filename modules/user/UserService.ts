import shortid from 'shortid'
import prismaService from '../../common/PrismaService';
import { CreateUserDTO, AuthenticateDTO, GetUserDTO} from "./UserDTOS";
import { generateJWT } from '../../utils/handleJWT';

class UserService {

    async getUserByUsername(user: GetUserDTO) {
        const userFound = await prismaService.user.findFirst({
            where: {
                username: user.username
            }
        })

        return {
            username: userFound?.username,
            id: userFound?.id,
            accountId: userFound?.accountId
        }
    }

    async getUserByUsernameWithPassword(user: GetUserDTO) {
        const userFound = await prismaService.user.findFirst({
            where: {
                username: user.username
            }
        })

        return userFound
    }

    async authenticate(user: AuthenticateDTO) {
        return generateJWT(user)
    }

    async createUser(user: CreateUserDTO) {
        const userCreated = await prismaService.user.create({
            data: {
                id: shortid.generate(),
                password: user.password,
                username: user.username,
                account: {
                    create: {
                        id: shortid.generate(),
                        balance: 100
                    }
                }
            }
        })
        
        return userCreated.id
    }
}

export default new UserService()