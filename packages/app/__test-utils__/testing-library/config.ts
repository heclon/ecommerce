const config = {
  username: process.env.TEST_USER || 'testuser@dovetailstudios.com',
  password: process.env.TEST_PASSWORD || 'Dovetail123',
  user: {
    userId: process.env.TEST_USER_ID || 'auth0|62e9a059643af8da196cb51f',
    firstName: 'Test',
    lastName: 'User',
    email: process.env.TEST_EMAIL || 'testuser@dovetailstudios.com',
  },
}

export default config
