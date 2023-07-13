const District = require("../models/district.model");
const Shop = require("../models/shop.model");

async function getAllDistricts(ctx) {
  try {
    const districts = await District.findAll({ include: Shop });
    ctx.body = { districts };
  } catch (error) {
    console.log(error);
    ctx.body = { error: error.message };
  }
}

async function getDistrictById(ctx) {
  try {
    const { id } = ctx.params;
    const district = await District.findByPk(id, { include: Shop });
    ctx.body = { district };
  } catch (error) {
    console.log(error);
    ctx.body = { error: error.message };
  }
}

async function deleteDistrict(ctx) {
  try {
    const { id } = ctx.params;
    const district = await District.findByPk(id);
    if (!district) {
      ctx.status = 404;
      ctx.body = { error: "District not found" };
      return;
    }
    await district.destroy();
    ctx.status = 200;
    ctx.body = { message: "District deleted successfully" };
  } catch (error) {
    console.log(error);
    ctx.body = { error: error.message };
  }
}

async function addDistrict(ctx) {
  try {
    const { district_name } = ctx.request.body;

    const district = await District.findOne({
      where: { district_name: district_name.toUpperCase() },
    });
    if (district) {
      ctx.body = { message: "District is already exist" };
      return;
    }
    const newDistrict = await District.create({
      district_name: district_name.toUpperCase(),
    });
    ctx.status = 201;
    ctx.body = { newDistrict };
  } catch (error) {
    console.log(error);
    ctx.status = 500;
    ctx.body = { error: error.message };
  }
}

async function updateDistrict(ctx) {
  const { id } = ctx.params;
  try {
    const district = await District.findByPk(id);
    if (!district) {
      ctx.status = 404;
      ctx.body = { error: "District not found" };
      return;
    }
    const { district_name } = ctx.request.body;
    const updated = await District.update(
      {
        district_name: district_name.toUpperCase(),
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
  getAllDistricts,
  addDistrict,
  getDistrictById,
  deleteDistrict,
  updateDistrict,
};
