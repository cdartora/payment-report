// @ts-ignore
import * as sinon from 'sinon';
import chai = require('chai');
import chaiHttp = require('chai-http');

import app from '../api';

import { prisma } from '../prisma';
import { expect } from 'chai';

type AppointmentReturn = {
  id: string;
  client: {
    id: string;
    name: string;
    userId: string;
  },
  value: string;
  installments: number;
  createdAt: string;
  isPaid: boolean;
};

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
  const deleteAppointment = prisma.appointment.deleteMany();
  await prisma.$transaction([deleteAppointment, deleteClient, deleteUser]);
  await prisma.$disconnect();
});

describe.only('Rota de Consultas', async () => {

  let token: string;
  let clientId: string;

  it('consegue fazer login como Érica', async () => {
    const response = await chai.request(app).post("/login").send({
      email: 'erica@mail.com',
      password: 'secret_admin',
    });

    expect(response.status).to.eq(200);
    expect(response.body).haveOwnProperty('token');
    token = response.body.token;
  });

  it('consegue criar um cliente com sucesso', async () => {
    const response = await chai.request(app).post("/client").send({
      name: 'Velma',
    }).set({ 'Authorization': token });

    expect(response.status).to.equal(201);

    const getResponse = await chai.request(app)
      .get('/client')
      .set({ 'Authorization': token });

    expect(getResponse.status).to.eq(200);

    clientId = getResponse.body[0].id;
  });

  describe(('POST /appointment'), async () => {

    it('consegue criar uma consulta com sucesso', async () => {
      const response = await chai.request(app).post("/appointment").send({
        clientId,
        value: 2000,
        installments: 5,
        isPaid: false,
      }).set({ 'Authorization': token });

      expect(response.status).to.equal(201);
      expect(response.body).haveOwnProperty('message');
      expect(response.body.message).to.eq('created successfully');
    });

    it('sem o clientId', async () => {
      const response = await chai.request(app).post("/appointment").send({
        value: 2000,
        installments: 5,
        isPaid: false,
      }).set({ 'Authorization': token });

      expect(response.status).to.equal(400);
      expect(response.body).haveOwnProperty('message');
      expect(response.body.message).to.eq('"clientId" is required');
    });

    it('sem o value', async () => {
      const response = await chai.request(app).post("/appointment").send({
        clientId,
        installments: 5,
        isPaid: false,
      }).set({ 'Authorization': token });

      expect(response.status).to.equal(400);
      expect(response.body).haveOwnProperty('message');
      expect(response.body.message).to.eq('"value" is required');
    });

    it('sem o installments', async () => {
      const response = await chai.request(app).post("/appointment").send({
        clientId,
        value: 2000,
        isPaid: false,
      }).set({ 'Authorization': token });

      expect(response.status).to.equal(400);
      expect(response.body).haveOwnProperty('message');
      expect(response.body.message).to.eq('"installments" is required');
    });

    it('sem o isPaid', async () => {
      const response = await chai.request(app).post("/appointment").send({
        clientId,
        value: 2000,
        installments: 5,
      }).set({ 'Authorization': token });

      expect(response.status).to.equal(400);
      expect(response.body).haveOwnProperty('message');
      expect(response.body.message).to.eq('"isPaid" is required');
    });

    it('sem o token', async () => {
      const response = await chai.request(app).post("/appointment").send({
        clientId,
        value: 2000,
        installments: 5,
        isPaid: false,
      });

      expect(response.status).to.equal(401);
      expect(response.body).haveOwnProperty('message');
      expect(response.body.message).to.eq('token not found');
    });

  });

  describe(('GET /appointment'), async () => {

    it('traz todas consultas com sucesso', async () => {
      const response = await chai.request(app).get("/appointment")
        .set({ 'Authorization': token });

      expect(response.status).to.equal(200);
      expect(Array.isArray(response.body));
      response.body.forEach((appointment: AppointmentReturn) => {
        expect(appointment).haveOwnProperty("id");
        expect(appointment).haveOwnProperty("client");
        expect(appointment.client).haveOwnProperty('id');
        expect(appointment.client).haveOwnProperty('name');
        expect(appointment.client).haveOwnProperty('userId');
        expect(appointment).haveOwnProperty("value");
        expect(appointment).haveOwnProperty("installments");
        expect(appointment).haveOwnProperty("createdAt");
        expect(appointment).haveOwnProperty("isPaid");
      });
    });

    it('sem o token', async () => {
      const response = await chai.request(app).get("/appointment");

      expect(response.status).to.equal(401);
      expect(response.body).haveOwnProperty('message');
      expect(response.body.message).to.eq('token not found');
    });

  });

  describe(('PUT /client'), async () => {
    let appointmentId: string;

    it('consegue encontrar a consulta', async () => {
      const getResponse = await chai.request(app).get('/appointment')
        .set({ 'Authorization': token });
      appointmentId = getResponse.body[0].id;
    });

    it('consegue editar uma consulta com sucesso', async () => {
      const response = await chai.request(app).put(`/appointment/${appointmentId}`).send({
        clientId,
        value: 2000,
        installments: 5,
        isPaid: false,
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

    it('editar consulta de outro usuário', async () => {
      const response = await chai.request(app).put(`/appointment/${appointmentId}`).send({
        clientId,
        value: 2000,
        installments: 5,
        isPaid: false,
      }).set({ 'Authorization': otherToken });

      console.log(response.body);


      expect(response.status).to.equal(401);
      expect(response.body).haveOwnProperty('message');
      expect(response.body.message).to.eq('permission invalid');
    });

    it('id inválido', async () => {
      const response = await chai.request(app).put('/appointment/certamente-um-id-válido').send({
        clientId,
        value: 2000,
        installments: 5,
        isPaid: false,
      }).set({ 'Authorization': token });

      expect(response.status).to.equal(404);
      expect(response.body).haveOwnProperty('message');
      expect(response.body.message).to.eq('appointment not found');
    });

    it('sem o clientId', async () => {
      const response = await chai.request(app).put(`/appointment/${appointmentId}`).send({
        value: 2000,
        installments: 5,
        isPaid: false,
      }).set({ 'Authorization': token });

      expect(response.status).to.equal(400);
      expect(response.body).haveOwnProperty('message');
      expect(response.body.message).to.eq('"clientId" is required');
    });

    it('sem o value', async () => {
      const response = await chai.request(app).put(`/appointment/${appointmentId}`).send({
        clientId,
        installments: 5,
        isPaid: false,
      }).set({ 'Authorization': token });

      expect(response.status).to.equal(400);
      expect(response.body).haveOwnProperty('message');
      expect(response.body.message).to.eq('"value" is required');
    });

    it('sem o installments', async () => {
      const response = await chai.request(app).put(`/appointment/${appointmentId}`).send({
        clientId,
        value: 2000,
        isPaid: false,
      }).set({ 'Authorization': token });

      expect(response.status).to.equal(400);
      expect(response.body).haveOwnProperty('message');
      expect(response.body.message).to.eq('"installments" is required');
    });

    it('sem o isPaid', async () => {
      const response = await chai.request(app).put(`/appointment/${appointmentId}`).send({
        clientId,
        value: 2000,
        installments: 5,
      }).set({ 'Authorization': token });

      expect(response.status).to.equal(400);
      expect(response.body).haveOwnProperty('message');
      expect(response.body.message).to.eq('"isPaid" is required');
    });

    it('sem o token', async () => {
      const response = await chai.request(app).put(`/appointment/${appointmentId}`).send({
        clientId,
        value: 2000,
        installments: 5,
        isPaid: false,
      });

      expect(response.status).to.equal(401);
      expect(response.body).haveOwnProperty('message');
      expect(response.body.message).to.eq('token not found');
    });

  });

  describe(('DELETE /appointment'), async () => {
    let appointmentId: string;

    it('consegue encontrar a consulta', async () => {
      const getResponse = await chai.request(app)
        .get('/appointment')
        .set({ 'Authorization': token });
      appointmentId = getResponse.body[0].id;
    });

    it('consegue deletar uma consulta com sucesso', async () => {
      const response = await chai.request(app)
        .delete(`/appointment/${appointmentId}`)
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

    it('deletar consulta de outro usuário', async () => {
      const response = await chai.request(app)
        .delete(`/appointment/${appointmentId}`)
        .set({ 'Authorization': otherToken });

      expect(response.status).to.eq(404);
      expect(response.body).haveOwnProperty('message');
      expect(response.body.message).to.eq('appointment not found')
    });

    it('id inválido', async () => {
      const response = await chai.request(app)
        .delete(`/appointment/certamente-um-id-válido'`)
        .set({ 'Authorization': token });

      expect(response.status).to.equal(404);
      expect(response.body).haveOwnProperty('message');
      expect(response.body.message).to.eq('appointment not found');
    });

    it('sem o token', async () => {
      const response = await chai.request(app)
        .delete(`/appointment/${appointmentId}`);

      expect(response.status).to.equal(401);
      expect(response.body).haveOwnProperty('message');
      expect(response.body.message).to.eq('token not found');
    });

  });

});
