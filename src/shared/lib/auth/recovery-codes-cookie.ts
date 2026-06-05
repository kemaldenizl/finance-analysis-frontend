import { cookies } from 'next/headers'
import { sealData, unsealData } from 'iron-session'

const COOKIE_NAME = 'mfa_recovery_codes'
const TTL_SECONDS = 60 * 5 // 5 dakika

type RecoveryCodesCookiePayload = {
  codes: string[]
  createdAt: number
}

function getSecret() {
  const secret = process.env.RECOVERY_CODES_COOKIE_SECRET

  if (!secret || secret.length < 32) {
    throw new Error(
      'RECOVERY_CODES_COOKIE_SECRET must be at least 32 characters.'
    )
  }

  return secret
}

export async function setRecoveryCodesCookie(codes: string[]) {
  const sealedCodes = await sealData(
    {
      codes,
      createdAt: Date.now(),
    },
    {
      password: getSecret(),
      ttl: TTL_SECONDS,
    }
  )

  const cookieStore = await cookies()

  cookieStore.set(COOKIE_NAME, sealedCodes, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/mfa/kodlar',
    maxAge: TTL_SECONDS,
  })
}

export async function getRecoveryCodesFromCookie() {
  const cookieStore = await cookies()
  const sealedCodes = cookieStore.get(COOKIE_NAME)?.value

  if (!sealedCodes) {
    return null
  }

  try {
    const payload = await unsealData<RecoveryCodesCookiePayload>(sealedCodes, {
      password: getSecret(),
      ttl: TTL_SECONDS,
    })

    if (!payload?.codes?.length) {
      return null
    }

    return payload.codes
  } catch {
    return null
  }
}

export async function clearRecoveryCodesCookie() {
  const cookieStore = await cookies()

  cookieStore.delete({ name: COOKIE_NAME, path: "/mfa/kodlar" });
}