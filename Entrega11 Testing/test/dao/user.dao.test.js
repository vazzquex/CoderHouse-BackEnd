import supertest from 'supertest';
import chai from 'chai';
import mongoose from 'mongoose';

import config from '../../src/tools/config.js';

import UserRepository from '../../src/repositories/user.repository.js';

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
            } catch (err){
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

        const {statusCode, _body} = await request.post('/api/users/').send(newUser);

        userId = _body._id;

        expect(_body).to.have.property('_id')
        expect(statusCode).to.equal(201)

    })

    it("The DAO must be able to obtain a user by email",async () => {



    })






})

