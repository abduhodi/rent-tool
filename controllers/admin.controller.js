const Admin = require("../models/admin.model");
const Session = require("../models/session.model");

async function getAllAdmins(ctx) {
  try {
    const admins = await Admin.findAll({ include: [Session] });
    ctx.body = { admins };
  } catch (error) {
    console.log(error);
    ctx.body = { error: error.message };
  }
}

async function getAdminById(ctx) {
  try {
    const { id } = ctx.params;
    const admin = await Admin.findByPk(id);
    ctx.body = { admin };
  } catch (error) {
    console.log(error);
    ctx.body = { error: error.message };
  }
}

async function deleteAdmin(ctx) {
  try {
    const { id } = ctx.params;
    const admin = await Admin.findByPk(id);
    if (!admin) {
      ctx.status = 404;
      ctx.body = { error: "Admin not found" };
      return;
    }
    await admin.destroy();
    ctx.status = 200;
    ctx.body = { message: "Admin deleted successfully" };
  } catch (error) {
    console.log(error);
    ctx.body = { error: error.message };
  }
}

async function addAdmin(ctx) {
  try {
    const { admin_phone_number, username, password } = ctx.request.body;
    const admin = await Admin.findOne({ where: { admin_phone_number } });
    if (admin) {
      ctx.body = { message: "Admin is already exist" };
      return;
    }
    const newAdmin = await Admin.create({
      admin_phone_number,
      username,
      hashed_password: password,
    });
    ctx.status = 201;
    ctx.body = { newAdmin };
  } catch (error) {
    console.log(error);
    ctx.status = 500;
    ctx.body = { error: error.message };
  }
}

async function updateAdmin(ctx) {
  const { id } = ctx.params;
  try {
    const admin = await Admin.findByPk(id);
    if (!admin) {
      ctx.status = 404;
      ctx.body = { error: "Admin not found" };
      return;
    }
    const { admin_phone_number, username, password } = ctx.request.body;
    const updated = await Admin.update(
      { admin_phone_number, username, hashed_password: password },
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

async function loginAdmin(ctx) {
  try {
    const { admin_phone_number } = ctx.request.body;
    const admin = await Admin.findOne({ where: { admin_phone_number } });
    if (!admin) {
      ctx.status = 404;
      ctx.body = { message: "Admin not found" };
    }

    ctx.body = { admin };
  } catch (error) {
    console.log(error);
    ctx.status = 500;
    ctx.body = { error: error.message };
  }
}

module.exports = {
  getAllAdmins,
  addAdmin,
  getAdminById,
  deleteAdmin,
  updateAdmin,
  loginAdmin,
};
