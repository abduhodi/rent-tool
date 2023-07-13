const { Op } = require("sequelize");
const Price = require("../models/price.model");
const ShopTool = require("../models/shop_tool.model");
const RentType = require("../models/rent_type.model");

async function getAllPrices(ctx) {
  try {
    const prices = await Price.findAll({
      include: [RentType, ShopTool],
    });
    ctx.body = { prices };
  } catch (error) {
    console.log(error);
    ctx.body = { error: error.message };
  }
}

async function getPriceById(ctx) {
  try {
    const { id } = ctx.params;
    const price = await Price.findByPk(id, { include: [RentType, ShopTool] });
    ctx.body = { price };
  } catch (error) {
    console.log(error);
    ctx.body = { error: error.message };
  }
}

async function deletePrice(ctx) {
  try {
    const { id } = ctx.params;
    const price = await Price.findByPk(id);
    if (!price) {
      ctx.status = 404;
      ctx.body = { error: "Price not found" };
      return;
    }
    await price.destroy();
    ctx.status = 200;
    ctx.body = { message: "Price deleted successfully" };
  } catch (error) {
    console.log(error);
    ctx.body = { error: error.message };
  }
}

async function addPrice(ctx) {
  try {
    const { shop_tool_id, rent_type_id, price } = ctx.request.body;

    const shop = await ShopTool.findByPk(shop_tool_id);
    if (!shop) {
      ctx.status = 404;
      ctx.body = { error: "ShopTool not found" };
      return;
    }

    const rent_type = await RentType.findByPk(rent_type_id);
    if (!rent_type) {
      ctx.status = 404;
      ctx.body = { error: "RentType not found" };
      return;
    }

    const oldPrice = await Price.findOne({
      where: { [Op.and]: [{ shop_tool_id }, { rent_type_id }] },
    });
    if (oldPrice) {
      ctx.body = { message: "Price is already exist" };
      return;
    }
    const newPrice = await Price.create({
      shop_tool_id,
      rent_type_id,
      price,
    });
    ctx.status = 201;
    ctx.body = { newPrice };
  } catch (error) {
    console.log(error);
    ctx.status = 500;
    ctx.body = { error: error.message };
  }
}

async function updatePrice(ctx) {
  const { id } = ctx.params;
  try {
    const oldPrice = await Price.findByPk(id);
    if (!oldPrice) {
      ctx.status = 404;
      ctx.body = { error: "Price not found" };
      return;
    }
    const { shop_tool_id, rent_type_id, price } = ctx.request.body;
    const updated = await Price.update(
      {
        shop_tool_id,
        rent_type_id,
        price,
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
  getAllPrices,
  addPrice,
  getPriceById,
  deletePrice,
  updatePrice,
};
