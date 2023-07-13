const RentType = require("../models/rent_type.model");

async function getAllRentTypes(ctx) {
  try {
    const rentTypes = await RentType.findAll();
    ctx.body = { rentTypes };
  } catch (error) {
    console.log(error);
    ctx.body = { error: error.message };
  }
}

async function getRentTypeById(ctx) {
  try {
    const { id } = ctx.params;
    const rentType = await RentType.findByPk(id);
    ctx.body = { rentType };
  } catch (error) {
    console.log(error);
    ctx.body = { error: error.message };
  }
}

async function deleteRentType(ctx) {
  try {
    const { id } = ctx.params;
    const rentType = await RentType.findByPk(id);
    if (!rentType) {
      ctx.status = 404;
      ctx.body = { error: "RentType not found" };
      return;
    }
    await rentType.destroy();
    ctx.status = 200;
    ctx.body = { message: "RentType deleted successfully" };
  } catch (error) {
    console.log(error);
    ctx.body = { error: error.message };
  }
}

async function addRentType(ctx) {
  try {
    const { type_name } = ctx.request.body;

    const rentType = await RentType.findOne({
      where: { type_name: type_name.toUpperCase() },
    });
    if (rentType) {
      ctx.body = { message: "RentType is already exist" };
      return;
    }
    const newRentType = await RentType.create({
      type_name: type_name.toUpperCase(),
    });
    ctx.status = 201;
    ctx.body = { newRentType };
  } catch (error) {
    console.log(error);
    ctx.status = 500;
    ctx.body = { error: error.message };
  }
}

async function updateRentType(ctx) {
  const { id } = ctx.params;
  try {
    const rentType = await RentType.findByPk(id);
    if (!rentType) {
      ctx.status = 404;
      ctx.body = { error: "RentType not found" };
      return;
    }
    const { type_name } = ctx.request.body;
    const updated = await RentType.update(
      {
        type_name: type_name.toUpperCase(),
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
  getAllRentTypes,
  addRentType,
  getRentTypeById,
  deleteRentType,
  updateRentType,
};
