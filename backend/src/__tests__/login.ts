// @ts-ignore
import * as sinon from 'sinon';
import chai = require('chai');
import chaiHttp = require('chai-http');

import app from '../api';

import { prisma } from '../prisma';
import { expect } from 'chai';

chai.use(chaiHttp);

describe('Rota de Login', async () => {

  describe(('POST /login'), async () => {
    beforeEach(async () => {
      try {
        await prisma.user.create({
          data: {
            name: 'Érica',
            email: 'erica@mail.com',
            password: '$2a$12$cEoKxFeC89HFIoTFZXao/uo3RV7FOnPiMsV2kJxHEQ89fQQZ8bORi' // secret_admin
          }
        });
      } catch (err: unknown) {
        console.log(err);

      }

      console.log('Érica cadastrada com sucesso!');
    });

    afterEach(async () => {
      const deleteUser = prisma.user.deleteMany();
      await prisma.$transaction([deleteUser]);
      await prisma.$disconnect();
    });

    it('consegue fazer login com sucesso', async () => {
      const response = await chai.request(app).post("/login").send({
        email: 'erica@mail.com',
        password: 'secret_admin',
      });

      expect(response.status).to.equal(200);
      expect(response).to.have.property('body');
      expect(response.body).to.have.property('id');
      expect(response.body).to.have.property('token');
      expect(response.body.name).to.eq('Érica');
      expect(response.body.email).to.eq('erica@mail.com');
    });

    it('email inválido', async () => {
      const response = await chai.request(app).post("/login").send({
        email: 'johndoe@mail.com',
        password: 'secret_admin',
      });

      expect(response.status).to.eq(404);
      expect(response.body).haveOwnProperty("message");
      expect(response.body.message).to.eq("user not found");
    });

    it('senha inválida', async () => {
      const response = await chai.request(app).post("/login").send({
        email: 'erica@mail.com',
        password: 'secret_erica',
      });

      expect(response.status).to.eq(400);
      expect(response.body).haveOwnProperty("message");
      expect(response.body.message).to.eq("invalid credentials");
    });

    it('sem email', async () => {
      const response = await chai.request(app).post("/login").send({
        password: 'secret_erica',
      });

      expect(response.status).to.eq(400);
      expect(response.body).haveOwnProperty("message");
      expect(response.body.message).to.eq('"email" is required');
    });

    it('sem senha', async () => {
      const response = await chai.request(app).post("/login").send({
        email: "erica@mail.com",
      });

      console.log(response.body);


      expect(response.status).to.eq(400);
      expect(response.body).haveOwnProperty("message");
      expect(response.body.message).to.eq('"password" is required');
    });
  });
});
