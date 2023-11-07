const base = require('../controller/user.controller')
const mockRequest = (body = {}) => ({ body })
const mockResponse = () => {
    const res = {}
    res.json = jest.fn().mockReturnValue(res)
    res.status = jest.fn().mockReturnValue(res)
    return res
}
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const jwt = require('jsonwebtoken');
const { ComparePassword, HashPassword } = require('../helper/hash_pass.helper')

describe('login controller', () => {
    test('internal server error 500', async () => {
        const req = mockRequest();
        const res = mockResponse();

        const mockUser = { id: 1, email: 'fadhil@mail.com', password: 'password' };


        req.body.password = mockUser.password
        req.body.email = mockUser.email

        prisma.user.findFirst = jest.fn().mockResolvedValue(true);
        // const ComparePassword = jest.fn().mockReturnValue(true);
        jwt.sign = jest.fn().mockReturnValue(true);

        await base.Login(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        // expect(res.json).toHaveBeenCalledWith({
        //     status: 500,
        //     message: 'internal server error',

        // });
    });

    test('200', async () => {
        const req = mockRequest();
        const res = mockResponse();

        const mockUser = { id: 1, email: 'fadhil@mail.com', password: 'password' };


        req.body.password = mockUser.password
        req.body.email = mockUser.email

        const hashPass = await HashPassword(req.body.password)

        prisma.user.findFirst = jest.fn().mockResolvedValue(true);
        const ComparePassword = jest.fn().mockReturnValue(true);
        jwt.sign = jest.fn().mockReturnValue(true);

        await base.Login(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        // expect(res.json).toHaveBeenCalledWith({
        //     status: 500,
        //     message: 'internal server error',

        // });
    });

    test('', async () => {
        const req = mockRequest();
        const res = mockResponse();

        const mockUser = { id: 1, email: 'fadhil@mail.com', password: 'password' };


        req.body.password = mockUser.password
        req.body.email = mockUser.email

        const hashPass = await HashPassword(req.body.password)

        prisma.user.findFirst = jest.fn().mockResolvedValue(true);
        const ComparePassword = jest.fn().mockReturnValue(true);
        jwt.sign = jest.fn().mockReturnValue(true);

        await base.Login(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        // expect(res.json).toHaveBeenCalledWith({
        //     status: 500,
        //     message: 'internal server error',

        // });
    });




    // test('return user not found, 400', done => {
    //     const req = mockRequest()
    //     const res = mockResponse()
    // })


})

