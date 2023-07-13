const Shop = require("../models/shop.model");
const Owner = require("../models/owner.model");
const ShopTool = require("../models/shop_tool.model");
const District = require("../models/district.model");

async function getAllShops(ctx) {
  try {
    const shops = await Shop.findAll({
      include: [
        { model: ShopTool, required: false },
        { model: Owner, required: false },
      ],
    });
    ctx.body = { shops };
  } catch (error) {
    console.log(error);
    ctx.body = { error: error.message };
  }
}

async function getShopById(ctx) {
  try {
    const { id } = ctx.params;
    const shop = await Shop.findOne({
      where: { id },
      include: [
        { model: ShopTool, required: false },
        { model: Owner, required: false },
      ],
    });
    ctx.body = { shop };
  } catch (error) {
    console.log(error);
    ctx.body = { error: error.message };
  }
}

async function deleteShop(ctx) {
  try {
    const { id } = ctx.params;
    const shop = await Shop.findByPk(id);
    if (!shop) {
      ctx.status = 404;
      ctx.body = { error: "Shop not found" };
      return;
    }
    await shop.destroy();
    ctx.status = 200;
    ctx.body = { message: "Shop deleted successfully" };
  } catch (error) {
    console.log(error);
    ctx.body = { error: error.message };
  }
}

async function addShop(ctx) {
  try {
    const {
      shop_name,
      shop_phone_number,
      district_id,
      shop_address,
      shop_location,
      owner_id,
    } = ctx.request.body;

    const owner = await Owner.findByPk(owner_id);
    if (!owner) {
      ctx.status = 404;
      ctx.body = { error: "Owner not found with id " + owner_id };
      return;
    }
    const district = await District.findByPk(district_id);
    if (!district) {
      ctx.status = 404;
      ctx.body = { error: "District not found with id " + district_id };
      return;
    }
    const shop = await Shop.findOne({ where: { shop_phone_number } });
    if (shop) {
      ctx.body = { message: "Shop is already exist" };
      return;
    }
    const newShop = await Shop.create({
      shop_name,
      shop_phone_number,
      district_id,
      shop_address,
      shop_location,
      owner_id,
    });
    ctx.status = 201;
    ctx.body = { newShop };
  } catch (error) {
    console.log(error);
    ctx.status = 500;
    ctx.body = { error: error.message };
  }
}

async function updateShop(ctx) {
  const { id } = ctx.params;
  try {
    const shop = await Shop.findByPk(id);
    if (!shop) {
      ctx.status = 404;
      ctx.body = { error: "Shop not found" };
      return;
    }
    const {
      shop_name,
      shop_phone_number,
      district_id,
      shop_address,
      shop_location,
      owner_id,
    } = ctx.request.body;
    const updated = await Shop.update(
      {
        shop_name,
        shop_phone_number,
        district_id,
        shop_address,
        shop_location,
        owner_id,
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
  getAllShops,
  addShop,
  getShopById,
  deleteShop,
  updateShop,
};
