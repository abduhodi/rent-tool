const Owner = require("../models/owner.model");
const Shop = require("../models/shop.model");
const Session = require("../models/session.model");

async function getAllOwners(ctx) {
  try {
    const owners = await Owner.findAll({
      include: [Shop, Session],
    });
    ctx.body = { owners };
  } catch (error) {
    console.log(error);
    ctx.body = { error: error.message };
  }
}

async function getOwnerById(ctx) {
  try {
    const { id } = ctx.params;
    const owner = await Owner.findByPk(id, {
      include: [Shop, Session],
    });
    ctx.body = { owner };
  } catch (error) {
    console.log(error);
    ctx.body = { error: error.message };
  }
}

async function deleteOwner(ctx) {
  try {
    const { id } = ctx.params;
    const owner = await Owner.findByPk(id);
    if (!owner) {
      ctx.status = 404;
      ctx.body = { error: "Owner not found" };
      return;
    }
    await owner.destroy();
    ctx.status = 200;
    ctx.body = { message: "Owner deleted successfully" };
  } catch (error) {
    console.log(error);
    ctx.body = { error: error.message };
  }
}

async function addOwner(ctx) {
  try {
    const { owner_name, owner_phone_number, username, password } =
      ctx.request.body;

    const owner = await Owner.findOne({ where: { owner_phone_number } });
    console.log(owner_phone_number);
    if (owner) {
      ctx.status = 404;
      ctx.body = { error: "Owner is already exist" };
      return;
    }

    const newOwner = await Owner.create({
      owner_name,
      owner_phone_number,
      username,
      hashed_password: password,
    });
    ctx.status = 201;
    ctx.body = { newOwner };
  } catch (error) {
    console.log(error);
    ctx.status = 500;
    ctx.body = { error: error.message };
  }
}

async function updateOwner(ctx) {
  const { id } = ctx.params;
  try {
    const owner = await Owner.findByPk(id);
    if (!owner) {
      ctx.status = 404;
      ctx.body = { error: "Owner not found" };
      return;
    }
    const { owner_name, owner_phone_number, username, password } =
      ctx.request.body;
    const updated = await Owner.update(
      {
        owner_name,
        owner_phone_number,
        username,
        hashed_password: password,
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
  getAllOwners,
  addOwner,
  getOwnerById,
  deleteOwner,
  updateOwner,
};
