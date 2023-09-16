import supertest from 'supertest';
import chai from 'chai';
import mongoose from 'mongoose';

import config from '../src/tools/config.js';

import { userService } from '../src/services/index.js';

const expect = chai.expect;
const request = supertest('http://localhost:8080');

let userId;

describe("Test User DAOs", () => {

    let newProduct;
    let productId;
    let userId;
    let user;

    before(async () => {
        await mongoose.connect(config.mongoUrl)
    })

    after(async () => {
        if (userId) {
            try {
                await mongoose.connection.collection('users').deleteOne({ _id: new mongoose.Types.ObjectId(userId) })
            } catch (err) {
                console.error(`Error to delete user ${err}`)
            }

        }

        if (productId) {
            try {
                await mongoose.connection.collection('products').deleteOne({ _id: new mongoose.Types.ObjectId(productId) })
            } catch {
                console.error(`Error to delete product ${err}`)
            }
        }
        await mongoose.connection.close()
    })


    it("Create new user", async () => {
        const newUser = {
            first_name: 'Santiago',
            last_name: 'Vazquez',
            email: 'santiago@example.com',
            password: '1234',
            documents: [
                {
                    name: '20230711_104338.jpg',
                    reference: '../data/documents/20230711_104338.jpg',
                },
                {
                    name: '20230711_104823.jpg',
                    reference: '../data/documents/20230711_104823.jpg',
                },
                {
                    name: '20230711_104316.jpg',
                    reference: '../data/documents/20230711_104316.jpg',
                }
            ]
        }

        const { statusCode, _body } = await request.post('/api/users/').send(newUser);

        user = _body
        userId = _body._id;

        expect(_body).to.have.property('_id')
        expect(statusCode).to.equal(201)

    })

    it("It must be possible to change the role of a user to premium and to premium to user correctly", async () => {

        expect(user.rol).to.be.equal('user');

        //change role premium
        await request.post(`/api/users/premium/${userId.toString()}`);
        user = await userService.getById(userId.toString());

        expect(user.rol).to.be.equal('premium');

        //change role user
        await request.post(`/api/users/premium/${userId.toString()}`);
        user = await userService.getById(userId.toString());

        expect(user.rol).to.be.equal('user');

    });



    it("Create producto to add a user cart", async () => {

        newProduct = {
            title: 'Example Product',
            description: 'Example Product Description',
            price: '123',
            stock: '10',
            category: 'test',
            email: 'admin'
        }

        const { _body, statusCode } = await request.post('/api/products/').send(newProduct);

        productId = _body.currentProduct._id

        expect(_body.currentProduct).to.have.property('_id');
        expect(_body.currentProduct).to.have.property('title');
        expect(_body.currentProduct).to.have.property('thumbnail');
        expect(_body.currentProduct.status).to.be.equal(true)
        expect(statusCode).to.be.equal(201);

    });

    it("The user can add a product to cart", async () => {

        let params = {
            productId: productId,
            quantity: 10,
        }

        const { _body, statusCode } = await request.post(`/api/carts/${userId}/cart`).send(params);

        expect(_body).to.have.an('object');
        expect(statusCode).to.be.equal(200);
    });

});