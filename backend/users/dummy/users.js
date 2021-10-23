const users = [
    // Valid account
    {
        username: 'testaccount',
        email: 'test@u.nus.edu',
        password: '12345678',
    },
    // Missing password
    {
        username: 'testaccount1',
        email: 'test1@u.nus.edu'
    },
    // Incorrect email
    {
        username: 'testaccount2',
        email: 'test2@u',
        password: '12345678',
    }
]

const accounts = [
    // Valid attempt
    {
        username: 'testaccount',
        password: '12345678',
    },
    // Missing password
    {
        username: 'testaccount',
    },
    // Non existent account
    {
        username: 'testaccount1',
        password: '12345678',
    },
    // Wrong password
    {
        username: 'testaccount',
        password: '12345671',
    }
]

module.exports = { users, accounts }