const express = require("express");
const port = 3000;

const app = express();

app.use(express.json());

const indexRouter = require("./index.routes");
app.use("/", indexRouter);

app.listen(port, () => {});
