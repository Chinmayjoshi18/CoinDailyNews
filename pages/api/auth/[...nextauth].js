import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

/**
 * NextAuth.js configuration
 * This sets up authentication for the application using credentials provider
 * In a production environment, you would typically use OAuth providers or a database
 */
export default NextAuth({
  // Configure authentication providers
  providers: [
    // Credentials Provider for email/password login
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'your@email.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // This is a placeholder function that would be replaced with actual authentication
        // In a real application, you would verify against a database or API
        
        // Mock user data - REPLACE THIS WITH ACTUAL AUTHENTICATION IN PRODUCTION
        const mockUsers = [
          { 
            id: '1', 
            name: 'Admin User', 
            email: 'admin@example.com', 
            password: 'admin123', 
            role: 'admin' 
          },
          { 
            id: '2', 
            name: 'Editor User', 
            email: 'editor@example.com', 
            password: 'editor123', 
            role: 'editor' 
          },
          { 
            id: '3', 
            name: 'Regular User', 
            email: 'user@example.com', 
            password: 'user123', 
            role: 'user' 
          },
        ];

        // Find user with matching email and password
        const user = mockUsers.find(
          (user) => 
            user.email === credentials.email && 
            user.password === credentials.password
        );

        // If found, return the user object
        if (user) {
          // Don't include password in the returned object
          const { password, ...userWithoutPassword } = user;
          return userWithoutPassword;
        }
        
        // Authentication failed
        return null;
      },
    }),
    // Add other providers here as needed:
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // }),
    // TwitterProvider({
    //   clientId: process.env.TWITTER_CLIENT_ID,
    //   clientSecret: process.env.TWITTER_CLIENT_SECRET,
    // }),
  ],
  
  // Custom pages (optional)
  pages: {
    signIn: '/auth/signin',
    // signOut: '/auth/signout',
    // error: '/auth/error',
    // verifyRequest: '/auth/verify-request',
    // newUser: '/auth/new-user',
  },
  
  // Callbacks
  callbacks: {
    // Add user role to the token
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    
    // Add user role to the session
    async session({ session, token }) {
      if (token && session.user) {
        session.user.role = token.role;
      }
      return session;
    },
  },
  
  // Session configuration
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  
  // JSON Web Token configuration
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  
  // Enable debug messages in development
  debug: process.env.NODE_ENV === 'development',
});