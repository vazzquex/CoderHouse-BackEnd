import chai from 'chai';
import supertest from 'supertest';

const expect = chai.expect;
const request = supertest("http://localhost:8080");

describe('Test - Sessions', () => {
    let userId;


    it('Create a new user correctly', async () => {
        const user = {
            first_name: 'User',
            last_name: 'Example',
            email: 'user@example.com',
            password: '123'
        }

        const { _body, statusCode } = await request.post("/api/users/").send(user)

        userId = _body._id;

        expect(statusCode).to.equal(201);
        expect(_body).to.be.ok;
        expect(_body).to.be.an('object');


    })


    it('The user must log in correctly', async () => {
        const user = {
            email: 'user@example.com',
            password: '123'
        }

        const {statusCode} = await request.post("/api/users/auth").send(user)
        expect(statusCode).to.be.equal(302)
    });



    it("The user must log out correctly", async () => {
        const { statusCode } = await request.post("/api/users/logout")
        expect(statusCode).to.be.equal(302);
    })


    it('The user must be able to delete correctly', async () => {

        const { _body, statusCode } = await request.delete(`/api/users/${userId}`)

        expect(_body).to.be.ok;
        expect(_body).to.be.an('object');
        expect(statusCode).to.equal(200)


    })

});