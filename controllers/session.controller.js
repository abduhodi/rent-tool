const Session = require("../models/session.model");
const Client = require("../models/client.model");
const Admin = require("../models/admin.model");

async function getAllSessions(ctx) {
  try {
    const sessions = await Session.findAll({
      include: [Client, Admin],
    });
    ctx.body = { sessions };
  } catch (error) {
    console.log(error);
    ctx.body = { error: error.message };
  }
}

async function getSessionById(ctx) {
  try {
    const { id } = ctx.params;
    const session = await Session.findByPk(id, { include: [Client, Admin] });
    ctx.body = { session };
  } catch (error) {
    console.log(error);
    ctx.body = { error: error.message };
  }
}

async function deleteSession(ctx) {
  try {
    const { id } = ctx.params;
    const session = await Session.findByPk(id);
    if (!session) {
      ctx.status = 404;
      ctx.body = { error: "Session not found" };
      return;
    }
    await session.destroy();
    ctx.status = 200;
    ctx.body = { message: "Session deleted successfully" };
  } catch (error) {
    console.log(error);
    ctx.body = { error: error.message };
  }
}

async function addSession(ctx) {
  try {
    const { user_type, user_id, device } = ctx.request.body;

    const user = await Admin.findByPk(user_id);
    if (!user) {
      ctx.status = 404;
      ctx.body = { error: "User not found" };
      return;
    }
    const newSession = await Session.create({
      user_type,
      admin_id: user_type === "admin" ? user_id : null,
      client_id: user_type === "client" ? user_id : null,
      owner_id: user_type === "owner" ? user_id : null,
      device,
      hashed_token: "hashed_token",
    });
    ctx.status = 201;
    ctx.body = { newSession };
  } catch (error) {
    console.log(error);
    ctx.status = 500;
    ctx.body = { error: error.message };
  }
}

async function updateSession(ctx) {
  const { id } = ctx.params;
  try {
    const session = await Session.findByPk(id);
    if (!session) {
      ctx.status = 404;
      ctx.body = { error: "Session not found" };
      return;
    }
    const { user_type, user_id, device } = ctx.request.body;
    const updated = await Session.update(
      {
        user_type,
        admin_id: user_type === "admin" ? user_id : null,
        client_id: user_type === "client" ? user_id : null,
        owner_id: user_type === "owner" ? user_id : null,
        device,
        hashed_token: "hashed_token",
      },
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

module.exports = {
  getAllSessions,
  addSession,
  getSessionById,
  deleteSession,
  updateSession,
};
