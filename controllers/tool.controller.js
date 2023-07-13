const Tool = require("../models/tool.model");

async function getAllTools(ctx) {
  try {
    const tools = await Tool.findAll();
    ctx.body = { tools };
  } catch (error) {
    console.log(error);
    ctx.body = { error: error.message };
  }
}

async function getToolById(ctx) {
  try {
    const { id } = ctx.params;
    const tool = await Tool.findByPk(id);
    ctx.body = { tool };
  } catch (error) {
    console.log(error);
    ctx.body = { error: error.message };
  }
}

async function deleteTool(ctx) {
  try {
    const { id } = ctx.params;
    const tool = await Tool.findByPk(id);
    if (!tool) {
      ctx.status = 404;
      ctx.body = { error: "Tool not found" };
      return;
    }
    await tool.destroy();
    ctx.status = 200;
    ctx.body = { message: "Tool deleted successfully" };
  } catch (error) {
    console.log(error);
    ctx.body = { error: error.message };
  }
}

async function addTool(ctx) {
  try {
    const { tool_name, tool_description, category_id } = ctx.request.body;

    const tool = await Tool.findOne({
      where: { tool_name: tool_name.toUpperCase() },
    });
    if (tool) {
      ctx.body = { message: "Tool is already exist" };
      return;
    }
    const newTool = await Tool.create({
      tool_name: tool_name.toUpperCase(),
      tool_description,
      category_id,
    });
    ctx.status = 201;
    ctx.body = { newTool };
  } catch (error) {
    console.log(error);
    ctx.status = 500;
    ctx.body = { error: error.message };
  }
}

async function updateTool(ctx) {
  const { id } = ctx.params;
  try {
    const tool = await Tool.findByPk(id);
    if (!tool) {
      ctx.status = 404;
      ctx.body = { error: "Tool not found" };
      return;
    }
    const { tool_name, tool_description, category_id } = ctx.request.body;
    const updated = await Tool.update(
      {
        tool_name: tool_name.toUpperCase(),
        tool_description,
        category_id,
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
  getAllTools,
  addTool,
  getToolById,
  deleteTool,
  updateTool,
};
