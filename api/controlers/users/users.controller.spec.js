process.env.APP_ENV = 'test';

const UserController = require('./users.contoller');
let userController;
let json;
let req;
let res;

beforeEach(() => {
    userController = new UserController();
    json = {json: jest.fn()};
    res = {};
    req = {};
});

describe('Login', () => {
    it('should hash a password to 60 random characters', () => {
        const mockPassword = 'mockPassword';
        const mockSaltValue = 10;

        return userController.hashPassword(mockPassword, mockSaltValue)
            .then(result => {
                expect(result.length).toBe(60);
            });
    });
});
