const Client = require("../models/client.model");
const Session = require("../models/session.model");

async function getAllClients(ctx) {
  try {
    const clients = await Client.findAll({ include: [Session] });
    ctx.body = { clients };
  } catch (error) {
    console.log(error);
    ctx.body = { error: error.message };
  }
}

async function getClientById(ctx) {
  try {
    const { id } = ctx.params;
    const client = await Client.findByPk(id);
    ctx.body = { client };
  } catch (error) {
    console.log(error);
    ctx.body = { error: error.message };
  }
}

async function deleteClient(ctx) {
  try {
    const { id } = ctx.params;
    const client = await Client.findByPk(id);
    if (!client) {
      ctx.status = 404;
      ctx.body = { error: "Client not found" };
      return;
    }
    await client.destroy();
    ctx.status = 200;
    ctx.body = { message: "Client deleted successfully" };
  } catch (error) {
    console.log(error);
    ctx.body = { error: error.message };
  }
}

async function addClient(ctx) {
  try {
    const { client_name, client_phone_number } = ctx.request.body;
    const client = await Client.findOne({ where: { client_phone_number } });
    if (client) {
      ctx.body = { message: "Client is already exist" };
      return;
    }
    const newClient = await Client.create({ client_name, client_phone_number });
    ctx.status = 201;
    ctx.body = { newClient };
  } catch (error) {
    console.log(error);
    ctx.status = 500;
    ctx.body = { error: error.message };
  }
}

async function updateClient(ctx) {
  const { id } = ctx.params;
  try {
    const client = await Client.findByPk(id);
    if (!client) {
      ctx.status = 404;
      ctx.body = { error: "Client not found" };
      return;
    }
    const { client_name, client_phone_number } = ctx.request.body;
    const updated = await Client.update(
      { client_name, client_phone_number },
      { where: { id } }
    );
    ctx.status = 200;
    ctx.body = { updated };
  } catch (error) {
    console.log(error);
    ctx.status = 500;
    ctx.body = { error: error.message };
  }
}

async function loginClient(ctx) {
  try {
    const { client_phone_number } = ctx.request.body;
    const client = await Client.findOne({ where: { client_phone_number } });
    if (!client) {
      ctx.status = 404;
      ctx.body = { message: "Client not found" };
    }

    ctx.body = { client };
  } catch (error) {
    console.log(error);
    ctx.status = 500;
    ctx.body = { error: error.message };
  }
}

module.exports = {
  getAllClients,
  addClient,
  getClientById,
  deleteClient,
  updateClient,
  loginClient,
};
