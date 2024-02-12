import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import prisma from '@/lib/prisma'
import bcrypt from 'bcrypt'

const secretKey = process.env.SECRET_KEY
const key = new TextEncoder().encode(secretKey)

export async function encrypt(payload: any) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('1 day from now')
        .sign(key)
}

export async function decrypt(input: string): Promise<any> {
    const { payload } = await jwtVerify(input, key, {
        algorithms: ['HS256']
    })
    return payload
}

export async function login(formData: FormData) {
    const username = formData.get('username')
    const password = formData.get('password')
    const user = await prisma.user.findUnique({
        where: {
            // @ts-expect-error
            username: username
        }
    });

    if (!user) return { error: 'No user found'}

    // @ts-expect-error
    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (!isCorrectPassword) return { error: 'Invalid credentials' }

    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000)
    const session = await encrypt({ user, expires })

    cookies().set('session', session, { expires, httpOnly: true })
}

export async function logout() {
    cookies().set('session', '', { expires: new Date(0) })
}

export async function getSession() {
    const session = cookies().get('session')?.value
    if (!session) return null
    return await decrypt(session)
}





