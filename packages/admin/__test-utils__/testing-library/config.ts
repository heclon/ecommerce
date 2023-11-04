const config = {
  username: process.env.TEST_USER || 'testadminuser@dovetailstudios.com',
  password: process.env.TEST_PASSWORD || 'Dovetail123',
  user: {
    userId: process.env.TEST_USER_ID || 'auth0|6371cdf4ffea2b1aaa6f99aa',
    firstName: 'Test',
    lastName: 'User',
    email: process.env.TEST_EMAIL || 'testadminuser@dovetailstudios.com',
  },
}

export default config
