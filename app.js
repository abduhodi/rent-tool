const Koa = require("koa");
const config = require("config");
const bodyparser = require("koa-bodyparser");
const sequelize = require("./config/db");

const app = new Koa();

app.use(bodyparser());

// Main Router
app.use(require("./routes/index.routes"));

const port = config.get("port");

async function start() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    app.listen(port), console.log(`server listening on ${port}`);
  } catch (error) {
    console.log(error);
  }
}

start();
