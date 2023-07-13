const Client = require("../models/client.model");
const ShopTool = require("../models/shop_tool.model");
const RentType = require("../models/rent_type.model");
const Rent = require("../models/rent.model");
const Price = require("../models/price.model");
const { Op } = require("sequelize");

async function getAllRents(ctx) {
  try {
    const rents = await Rent.findAll({
      include: { all: true, nested: true },
    });
    ctx.body = { rents };
  } catch (error) {
    console.log(error);
    ctx.body = { error: error.message };
  }
}

async function getRentById(ctx) {
  try {
    const { id } = ctx.params;
    const rent = await Rent.findOne({
      where: { id },
      include: { all: true, nested: true },
    });
    ctx.body = { rent };
  } catch (error) {
    console.log(error);
    ctx.body = { error: error.message };
  }
}

async function deleteRent(ctx) {
  try {
    const { id } = ctx.params;
    const rent = await Rent.findByPk(id);
    console.log(rent);
    if (!rent) {
      ctx.status = 404;
      ctx.body = { error: "Rent not found" };
      return;
    }
    await rent.destroy();
    ctx.status = 200;
    ctx.body = { message: "Rent deleted successfully" };
  } catch (error) {
    console.log(error);
    ctx.body = { error: error.message };
  }
}

async function addRent(ctx) {
  try {
    const {
      client_id,
      shop_tool_id,
      rent_type_id,
      rent_date,
      rent_period,
      finished,
    } = ctx.request.body;

    const client = await Client.findByPk(client_id);
    if (!client) {
      ctx.status = 404;
      ctx.body = { error: "Client not found" };
      return;
    }
    const shop_tool = await ShopTool.findByPk(shop_tool_id);
    // console.log(shop_tool);
    if (!shop_tool || !shop_tool.dataValues.available) {
      ctx.status = 404;
      ctx.body = { error: "ShopTool not found or not available" };
      return;
    }
    const rent_type = await RentType.findByPk(rent_type_id);
    if (!rent_type) {
      ctx.status = 404;
      ctx.body = { error: "RentType not found" };
      return;
    }
    const rent = await Rent.findByPk(shop_tool_id);
    if (rent && rent.finished === false) {
      ctx.status = 404;
      ctx.body = { error: "This ShopTool is still beeing used" };
      return;
    }
    const toolPrice = await Price.findOne({
      where: { [Op.and]: [{ shop_tool_id }, { rent_type_id }] },
    });

    if (!toolPrice) {
      ctx.status = 404;
      ctx.body = { error: "Tool or rent type entered incorrectly" };
      return;
    }
    shop_tool.available = false;
    await shop_tool.save();

    const price = toolPrice.price;
    const total_price = price * rent_period;
    const newRent = await Rent.create({
      client_id,
      shop_tool_id,
      rent_type_id,
      rent_price: price,
      rent_date: new Date(rent_date),
      rent_period,
      total_price,
      finished,
    });
    ctx.status = 201;
    ctx.body = { newRent };
  } catch (error) {
    console.log(error);
    ctx.status = 500;
    ctx.body = { error: error.message };
  }
}

async function updateRent(ctx) {
  const { id } = ctx.params;
  try {
    const oldRent = await Rent.findByPk(id);
    if (!oldRent) {
      ctx.status = 404;
      ctx.body = { error: "Rent not found" };
      return;
    }
    const {
      client_id,
      shop_tool_id,
      rent_type_id,
      rent_date,
      rent_period,
      finished,
    } = ctx.request.body;
    const client = await Client.findByPk(client_id);
    if (!client) {
      ctx.status = 404;
      ctx.body = { error: "Client not found" };
      return;
    }
    const shop_tool = await ShopTool.findByPk(shop_tool_id);
    if (
      (!shop_tool || !shop_tool.available) &&
      oldRent.shop_tool_id !== shop_tool_id
    ) {
      ctx.status = 404;
      ctx.body = { error: "ShopTool not found or not available" };
      return;
    }
    const rent_type = await RentType.findByPk(rent_type_id);
    if (!rent_type) {
      ctx.status = 404;
      ctx.body = { error: "RentType not found" };
      return;
    }
    const rent = await Rent.findByPk(shop_tool_id);
    if (
      rent &&
      rent.finished === false &&
      oldRent.shop_tool_id !== shop_tool_id
    ) {
      ctx.status = 404;
      ctx.body = { error: "This ShopTool is still beeing used" };
      return;
    }
    const toolPrice = await Price.findOne({
      where: { [Op.and]: [{ shop_tool_id }, { rent_type_id }] },
    });

    if (!toolPrice) {
      ctx.status = 404;
      ctx.body = { error: "Tool or rent type entered incorrectly" };
      return;
    }
    shop_tool.available = finished ? true : false;
    await shop_tool.save();

    const price = toolPrice.price;
    const total_price = price * rent_period;
    const updated = await Rent.update(
      {
        client_id,
        shop_tool_id,
        rent_type_id,
        rent_price: price,
        rent_date,
        rent_period,
        total_price,
        finished,
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
  getAllRents,
  addRent,
  getRentById,
  deleteRent,
  updateRent,
};
