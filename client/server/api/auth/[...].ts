import CredentialsProvider from 'next-auth/providers/credentials'
import { NuxtAuthHandler } from '#auth';
import { loginCustomer } from '~/api/all-api-handlers';

export default NuxtAuthHandler({
  // A secret string you define, to ensure correct encryption
  secret: process.env.SECRET,
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
        email: { label: 'Email', type: 'email', placeholder: '(hint: jsmith)' },
        phone: { label: 'Phone Number', type: 'number', placeholder: '998991002030' },
        password: { label: 'Password', type: 'password', placeholder: '(hint: hunter2)' }
      },
      async authorize (credentials: any) {
        try {
          const customerData = await loginCustomer(credentials);
          console.log("Login Data",customerData);
          return {
              id: customerData.data.data.customer.id,
              phone: customerData.data.data.customer.phone,
              name: customerData.data.data.customer.name,
              email: customerData.data.data.customer.email,
              status: customerData.data.data.customer.status,
              accessToken: customerData.data.data.accessToken,
              refreshToken: customerData.data.data.refreshToken,
          };
        }catch(err: any){
          if(err?.response?.data?.errors){
            throw createError({statusCode: 400, statusMessage: err?.response?.data?.errors})
          }
        }
      }
    })
  ],
  callbacks: {
    // Callback when the JWT is created / updated, see https://next-auth.js.org/configuration/callbacks#jwt-callback
    jwt: async ({token, user}) => {
      console.log("User", user)
      const isSignIn = user ? true : false;
      if (isSignIn) {
        token.jwt = user ? (user as any).access_token || '' : '';
        token.id = user ? user.id || '' : '';
        token.name = user ? user.name || '' : '';
        token.email = user ? user.email || '' : '';
        token.phone = user ? user.phone || '' : '';
        token.status = user ? user.status || '' : '';
        token.accessToken = user ? user.accessToken || '' : '';
        token.refreshToken = user ? user.refreshToken || '' : '';
      }
      return Promise.resolve(token);
    },
    // Callback whenever session is checked, see https://next-auth.js.org/configuration/callbacks#session-callback
    session: async ({session, token}) => {
      (session as any).userId = token.id;
      (session as any).name = token.name;
      (session as any).email = token.email;
      (session as any).phone = token.phone;
      (session as any).status = token.status;
      (session as any).accessToken = token.accessToken;
      (session as any).refreshToken = token.refreshToken;
      return Promise.resolve(session);
    },
  },
})