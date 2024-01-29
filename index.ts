import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import { balance } from "./routers/balance.routes.js";
import transacciones from "./routers/transacciones.routes.js";
import cuentas from "./routers/cuentas.routes.js";
import "reflect-metadata";

//config
dotenv.config();

//Instance server
const app: any = express();

//middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors({ origin: "*" }));

//routes
app.use("/cuentas", cuentas);
app.use("/transacciones", transacciones);
app.use("/balance", balance);


app.listen(process.env.PORT, () => {
  console.log("listening on port " + process.env.PORT);
});

