// @ts-ignore
import * as sinon from 'sinon';
import chai = require('chai');
import chaiHttp = require('chai-http');

import app from '../api';

import { prisma } from '../prisma';
import { expect } from 'chai';

chai.use(chaiHttp);

describe.only('Rota de User', async () => {

  describe(('POST /user'), async () => {
    beforeEach(async () => {
      await prisma.user.create({
        data: {
          name: 'Érica',
          email: 'erica@mail.com',
          password: '$2a$12$cEoKxFeC89HFIoTFZXao/uo3RV7FOnPiMsV2kJxHEQ89fQQZ8bORi' // secret_admin
        }
      });

      console.log('Érica cadastrada com sucesso!');
    });

    afterEach(async () => {
      const deleteUser = prisma.user.deleteMany();
      await prisma.$transaction([deleteUser]);
      await prisma.$disconnect();
    });

    it('consegue registrar um usuário com sucesso', async () => {
      const response = await chai.request(app).post("/user").send({
        name: 'John Doe',
        email: 'johndoe@mail.com',
        password: 'secret_user',
      });

      expect(response.status).to.equal(201);
      expect(response.body).haveOwnProperty('message');
      expect(response.body.message).to.eq('user created successfully');
    });

    it('email já cadastrado', async () => {
      const response = await chai.request(app).post("/user").send({
        name: 'Érica Barcellos',
        email: 'erica@mail.com',
        password: 'secret_admin',
      });

      expect(response.status).to.equal(409);
      expect(response.body).haveOwnProperty('message');
      expect(response.body.message).to.eq('user already registered');
    });

    it('sem nome', async () => {
      const response = await chai.request(app).post("/user").send({
        email: 'johndoe@mail.com',
        password: 'secret_user',
      });

      expect(response.status).to.equal(400);
      expect(response.body).haveOwnProperty('message');
      expect(response.body.message).to.eq('"name" is required');
    });

    it('sem email', async () => {
      const response = await chai.request(app).post("/user").send({
        name: 'John Doe',
        password: 'secret_user',
      });

      expect(response.status).to.equal(400);
      expect(response.body).haveOwnProperty('message');
      expect(response.body.message).to.eq('"email" is required');
    });

    it('sem password', async () => {
      const response = await chai.request(app).post("/user").send({
        name: 'John Doe',
        email: 'johndoe@mail.com',
      });

      expect(response.status).to.equal(400);
      expect(response.body).haveOwnProperty('message');
      expect(response.body.message).to.eq('"password" is required');
    });

  });

});
