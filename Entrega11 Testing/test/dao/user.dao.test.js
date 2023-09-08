import supertest from 'supertest';
import chai from 'chai';
import mongoose from 'mongoose';

import config from '../../src/tools/config.js';

import { userService } from '../../src/services/index.js';

const expect = chai.expect;
const request = supertest('http://localhost:8080');

let userId;

describe("Test User DAOs", () => {

    before(async () => {
        await mongoose.connect(config.mongoUrl)
    })

    after(async () => {
        await mongoose.connection.close()
    })

    afterEach(async () => {
        if (userId) {
            try {
                await mongoose.connection.collection('users').deleteOne({ _id: new mongoose.Types.ObjectId(userId) })
            } catch (err) {
                console.error(`Error al eliminar el usuario ${err}`)
            }

        }
    })

    it("Create new user", async () => {
        const newUser = {
            first_name: 'Santiago',
            last_name: 'Vazquez',
            email: 'santiago@example.com',
            password: '1234'
        }

        const { statusCode, _body } = await request.post('/api/users/').send(newUser);

        userId = _body._id;

        expect(_body).to.have.property('_id')
        expect(statusCode).to.equal(201)

    })

    it("It must be possible to change the role of a user to premium and to premium to user correctly", async () => {

        const mockUser = {
            first_name: 'Santiago',
            last_name: 'Vazquez',
            email: 'santiago@example.com',
            password: '1234',
            rol: 'user'
        }

        // create user
        let user = await userService.createUser(mockUser);
        expect(user.rol).to.be.equal('user');
        userId = user._id;


        //change role premium
        await request.post(`/api/users/premium/${userId.toString()}`);
        user = await userService.getById(userId.toString());

        expect(user.rol).to.be.equal('premium');

        //change role user
        await request.post(`/api/users/premium/${userId.toString()}`);
        user = await userService.getById(userId.toString());

        expect(user.rol).to.be.equal('user');

    })






})

