export interface CreateUserDTO {
    username: string,
    password: string
}

export interface AuthenticateDTO extends CreateUserDTO{
    id: string
    accountId: string
}

export interface GetUserDTO {
    username: string
}