const Category = require("../models/category.model");

async function getAllCategories(ctx) {
  try {
    const categories = await Category.findAll();
    ctx.body = { categories };
  } catch (error) {
    console.log(error);
    ctx.body = { error: error.message };
  }
}

async function getCategoryById(ctx) {
  try {
    const { id } = ctx.params;
    const category = await Category.findByPk(id);
    ctx.body = { category };
  } catch (error) {
    console.log(error);
    ctx.body = { error: error.message };
  }
}

async function deleteCategory(ctx) {
  try {
    const { id } = ctx.params;
    const category = await Category.findByPk(id);
    if (!category) {
      ctx.status = 404;
      ctx.body = { error: "Category not found" };
      return;
    }
    await category.destroy();
    ctx.status = 200;
    ctx.body = { message: "Category deleted successfully" };
  } catch (error) {
    console.log(error);
    ctx.body = { error: error.message };
  }
}

async function addCategory(ctx) {
  try {
    const { category_name, category_description } = ctx.request.body;
    const category = await Category.findOne({ where: { category_name } });
    if (category) {
      ctx.body = { message: "Category is already exist" };
      return;
    }
    const newCategory = await Category.create({
      category_name,
      category_description,
    });
    ctx.status = 201;
    ctx.body = { newCategory };
  } catch (error) {
    console.log(error);
    ctx.status = 500;
    ctx.body = { error: error.message };
  }
}

async function updateCategory(ctx) {
  const { id } = ctx.params;
  try {
    const category = await Category.findByPk(id);
    if (!category) {
      ctx.status = 404;
      ctx.body = { error: "Category not found" };
      return;
    }
    const { category_name, category_description } = ctx.request.body;
    const updated = await Category.update(
      { category_name, category_description },
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
  getAllCategories,
  addCategory,
  getCategoryById,
  deleteCategory,
  updateCategory,
};
