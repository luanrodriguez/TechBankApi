import jwt from 'jsonwebtoken'

export function generateJWT(toBeSigned: any) {
    const secret: string = process.env.JWT_SECRET
    const token = jwt.sign(toBeSigned, secret, {
        expiresIn: 86400
    })
    return token
}

export function getJWTContent(jwtSent: string) {
    const secret: string = process.env.JWT_SECRET
    const jwtContent = jwt.verify(jwtSent, secret)
    return jwtContent
}