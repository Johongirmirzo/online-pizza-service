import CredentialsProvider from 'next-auth/providers/credentials'
import { NuxtAuthHandler } from '#auth'
import { BASE_URL, ENDPOINTS } from '../../../config/endpoints'

export default NuxtAuthHandler({
  pages: {
    signIn: '/login',
  },
  // A secret string you define, to ensure correct encryption
  secret: 'your-secret-here',
  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    CredentialsProvider.default({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: '(hint: jsmith)' },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: '(hint: hunter2)',
        },
      },
      async authorize(credentials: any) {
        console.log('Cred', credentials)
        try {
          const res = await fetch(`${BASE_URL}${ENDPOINTS.LOGIN}`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
          })
          const userData = await res.json()
          console.log('User Data', userData)
          if (userData?.errors) {
            throw createError({
              statusCode: 400,
              statusMessage: userData.errors,
            })
          } else {
            return {
              id: userData.data.user.id,
              photo: userData.data.user.photo,
              name: userData.data.user.name,
              email: userData.data.user.email,
              role: userData.data.user.role,
              accessToken: userData.data.accessToken,
              refreshToken: userData.data.refreshToken,
            }
          }
        } catch (err: any) {
          console.log('eerr', err)
          throw createError({ statusCode: 400, statusMessage: err.message })
        }
      },
    }),
  ],
  callbacks: {
    // Callback when the JWT is created / updated, see https://next-auth.js.org/configuration/callbacks#jwt-callback
    jwt: async ({ token, user }) => {
      console.log('User', user)
      const isSignIn = user ? true : false
      if (isSignIn) {
        token.jwt = user ? (user as any).access_token || '' : ''
        token.id = user ? user.id || '' : ''
        token.photo = user ? user.photo || '' : ''
        token.accessToken = user ? user.accessToken || '' : ''
        token.refreshToken = user ? user.refreshToken || '' : ''
        token.role = user ? (user as any).role || '' : ''
      }
      return Promise.resolve(token)
    },
    // Callback whenever session is checked, see https://next-auth.js.org/configuration/callbacks#session-callback
    session: async ({ session, token }) => {
      ;(session as any).role = token.role
      ;(session as any).userId = token.id
      ;(session as any).userPhoto = token.photo
      ;(session as any).accessToken = token.accessToken
      ;(session as any).refreshToken = token.refreshToken
      return Promise.resolve(session)
    },
  },
})
