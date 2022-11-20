export interface transferValueDTO {
    debitedAccountId: string,
    creditedUsername: string,
    value: number,
    creditedAccountId: string
}

export interface getTransactionsDTO {
    accountId: string
}