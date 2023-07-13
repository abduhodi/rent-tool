const Tool = require("../models/tool.model");
const Shop = require("../models/shop.model");
const ShopTool = require("../models/shop_tool.model");
const { Op } = require("sequelize");

async function getAllShopTools(ctx) {
  try {
    const shop_tools = await ShopTool.findAll({
      include: [Shop, Tool],
    });
    ctx.body = { shop_tools };
  } catch (error) {
    console.log(error);
    ctx.body = { error: error.message };
  }
}

async function getShopToolById(ctx) {
  try {
    const { id } = ctx.params;
    const shop_tool = await ShopTool.findByPk(id, { include: [Shop, Tool] });
    ctx.body = { shop_tool };
  } catch (error) {
    console.log(error);
    ctx.body = { error: error.message };
  }
}

async function deleteShopTool(ctx) {
  try {
    const { id } = ctx.params;
    const shop_tool = await ShopTool.findByPk(id);
    if (!shop_tool) {
      ctx.status = 404;
      ctx.body = { error: "ShopTool not found" };
      return;
    }
    await shop_tool.destroy();
    ctx.status = 200;
    ctx.body = { message: "ShopTool deleted successfully" };
  } catch (error) {
    console.log(error);
    ctx.body = { error: error.message };
  }
}

async function addShopTool(ctx) {
  try {
    const { shop_id, tool_id } = ctx.request.body;

    const shop = await Shop.findByPk(shop_id);
    if (!shop) {
      ctx.status = 404;
      ctx.body = { error: "Shop not found" };
      return;
    }
    const tool = await Tool.findByPk(tool_id);
    if (!tool) {
      ctx.status = 404;
      ctx.body = { error: "Tool not found" };
      return;
    }

    const shop_tool = await ShopTool.findOne({
      where: { [Op.and]: [{ shop_id }, { tool_id }] },
    });
    if (shop_tool) {
      ctx.status = 404;
      ctx.body = { error: "ShopTool is already exist" };
      return;
    }
    const newShopTool = await ShopTool.create({
      shop_id,
      tool_id,
    });
    ctx.status = 201;
    ctx.body = { newShopTool };
  } catch (error) {
    console.log(error);
    ctx.status = 500;
    ctx.body = { error: error.message };
  }
}

async function updateShopTool(ctx) {
  const { id } = ctx.params;
  try {
    const shop_tool = await ShopTool.findByPk(id);
    if (!shop_tool) {
      ctx.status = 404;
      ctx.body = { error: "ShopTool not found" };
      return;
    }
    const { shop_id, tool_id } = ctx.request.body;
    const updated = await ShopTool.update(
      {
        shop_id,
        tool_id,
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
  getAllShopTools,
  addShopTool,
  getShopToolById,
  deleteShopTool,
  updateShopTool,
};
