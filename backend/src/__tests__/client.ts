// @ts-ignore
import * as sinon from 'sinon';
import chai = require('chai');
import chaiHttp = require('chai-http');

import app from '../api';

import { prisma } from '../prisma';
import { expect } from 'chai';
import { Client } from '../types/user';

chai.use(chaiHttp);

before(async () => {
  await prisma.user.create({
    data: {
      name: 'Érica',
      email: 'erica@mail.com',
      password: '$2a$12$cEoKxFeC89HFIoTFZXao/uo3RV7FOnPiMsV2kJxHEQ89fQQZ8bORi' // secret_admin
    }
  });

  await prisma.user.create({
    data: {
      name: 'Admin',
      email: 'admin@mail.com',
      password: '$2a$12$g0XMirLkqs67/hEVwR9WFuSRTkD0VnNZzCklT6hBkuCmR4PLa0C9a' // ayecaptain
    }
  });

  console.log('Érica cadastrada com sucesso!');
});

after(async () => {
  const deleteUser = prisma.user.deleteMany();
  const deleteClient = prisma.client.deleteMany();
  await prisma.$transaction([deleteClient, deleteUser]);
  await prisma.$disconnect();
});

describe('Rota de Clientes', async () => {

  let token: string;

  it('consegue fazer login como Érica', async () => {
    const response = await chai.request(app).post("/login").send({
      email: 'erica@mail.com',
      password: 'secret_admin',
    });

    expect(response.status).to.eq(200);
    expect(response.body).haveOwnProperty('token');
    token = response.body.token;
  });

  describe(('POST /client'), async () => {

    it('consegue criar um cliente com sucesso', async () => {
      const response = await chai.request(app).post("/client").send({
        name: 'Velma',
      }).set({ 'Authorization': token });

      expect(response.status).to.equal(201);
      expect(response.body).haveOwnProperty('message');
      expect(response.body.message).to.eq('created successfully');
    });

    it('sem o nome', async () => {
      const response = await chai.request(app).post("/client").send({
      }).set({ 'Authorization': token });

      expect(response.status).to.equal(400);
      expect(response.body).haveOwnProperty('message');
      expect(response.body.message).to.eq('"name" is required');
    });

    it('sem o token', async () => {
      const response = await chai.request(app).post("/client").send({
        name: 'Velma',
      });

      expect(response.status).to.equal(401);
      expect(response.body).haveOwnProperty('message');
      expect(response.body.message).to.eq('token not found');
    });

  });

  describe(('GET /client'), async () => {

    it('traz todos clientes com sucesso', async () => {
      const response = await chai.request(app).get("/client")
        .set({ 'Authorization': token });

      expect(response.status).to.equal(200);
      expect(Array.isArray(response.body));
      response.body.forEach((client: Client) => {
        expect(client).haveOwnProperty("id");
        expect(client).haveOwnProperty("name");
        expect(client).haveOwnProperty("userId");
      });
    });

    it('sem o token', async () => {
      const response = await chai.request(app).get("/client");

      expect(response.status).to.equal(401);
      expect(response.body).haveOwnProperty('message');
      expect(response.body.message).to.eq('token not found');
    });

  });

  describe(('PUT /client'), async () => {
    let clientId: string;

    it('consegue encontrar o cliente', async () => {
      const getResponse = await chai.request(app).get('/client')
        .set({ 'Authorization': token });
      clientId = getResponse.body[0].id;
    });

    it('consegue editar um cliente com sucesso', async () => {
      const response = await chai.request(app).put(`/client/${clientId}`).send({
        name: 'Daphne',
      }).set({ 'Authorization': token });

      expect(response.status).to.equal(200);
      expect(response.body).haveOwnProperty('message');
      expect(response.body.message).to.eq('updated successfully');
    });

    let otherToken: string;

    it('consegue fazer login como Admin', async () => {
      const response = await chai.request(app).post("/login").send({
        email: 'admin@mail.com',
        password: 'ayecaptain',
      });

      expect(response.status).to.eq(200);
      expect(response.body).haveOwnProperty('token');
      otherToken = response.body.token;
    });

    it('editar cliente de outro usuário', async () => {
      const response = await chai.request(app).put(`/client/${clientId}`).send({
        name: 'Daphne',
      }).set({ 'Authorization': otherToken });

      expect(response.status).to.equal(401);
      expect(response.body).haveOwnProperty('message');
      expect(response.body.message).to.eq('permission invalid');
    });

    it('id inválido', async () => {
      const response = await chai.request(app)
        .put(`/client/certamente-um-id-válido'`)
        .send({
          name: 'Daphne',
        })
        .set({ 'Authorization': token });

      expect(response.status).to.equal(404);
      expect(response.body).haveOwnProperty('message');
      expect(response.body.message).to.eq('client not found');
    });

    it('sem name', async () => {
      const response = await chai.request(app)
        .put(`/client/${clientId}`)
        .set({ 'Authorization': token });

      expect(response.status).to.equal(400);
      expect(response.body).haveOwnProperty('message');
      expect(response.body.message).to.eq('"name" is required');
    });

    it('sem o token', async () => {
      const response = await chai.request(app)
        .put(`/client/${clientId}`)
        .send({
          name: 'Scooby',
        });

      expect(response.status).to.equal(401);
      expect(response.body).haveOwnProperty('message');
      expect(response.body.message).to.eq('token not found');
    });

  });

  describe(('DELETE /client'), async () => {
    let clientId: string;

    it('consegue encontrar o cliente', async () => {
      const getResponse = await chai.request(app)
        .get('/client')
        .set({ 'Authorization': token });
      clientId = getResponse.body[0].id;
    });

    it('consegue deletar um cliente com sucesso', async () => {
      const response = await chai.request(app)
        .delete(`/client/${clientId}`)
        .set({ 'Authorization': token });

      expect(response.status).to.equal(200);
      expect(response.body).haveOwnProperty('message');
      expect(response.body.message).to.eq('deleted successfully');
    });

    let otherToken: string;

    it('consegue fazer login como Admin', async () => {
      const response = await chai.request(app).post("/login").send({
        email: 'admin@mail.com',
        password: 'ayecaptain',
      });

      expect(response.status).to.eq(200);
      expect(response.body).haveOwnProperty('token');
      otherToken = response.body.token;
    });

    it('deletar cliente de outro usuário', async () => {
      const response = await chai.request(app)
        .delete(`/client/${clientId}`)
        .set({ 'Authorization': otherToken });

      expect(response.status).to.eq(404);
      expect(response.body).haveOwnProperty('message');
      expect(response.body.message).to.eq('client not found')
    });

    it('id inválido', async () => {
      const response = await chai.request(app)
        .delete(`/client/certamente-um-id-válido'`)
        .set({ 'Authorization': token });

      expect(response.status).to.equal(404);
      expect(response.body).haveOwnProperty('message');
      expect(response.body.message).to.eq('client not found');
    });

    it('sem o token', async () => {
      const response = await chai.request(app)
        .delete(`/client/${clientId}`);

      expect(response.status).to.equal(401);
      expect(response.body).haveOwnProperty('message');
      expect(response.body.message).to.eq('token not found');
    });

  });

});
