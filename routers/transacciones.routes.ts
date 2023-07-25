import express, { Request, Response, NextFunction, Router } from "express";
import { Connection } from "../middlewares/classes/connection.js";
import { Dealings } from "../storage/dealings.js";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";

const transacciones = express.Router();

let con: Connection;
let connection: any;

//connection DB
transacciones.use((req: Request, res: Response, next: NextFunction) => {
  try {
    con = new Connection(
      process.env.DB_HOST,
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD
    );
    connection = con.connection;
    next();
  } catch (error) {
    res.sendStatus(500);
    res.send(error);
  }
});

transacciones.post("/", async (req: Request, res: Response) => {
  try {
    var data = plainToClass(Dealings, req.body, {
      excludeExtraneousValues: true,
    });
    console.log(data);
    req.body = data;
    await validate(data);
  } catch (err) {
    res.status(500).send(JSON.stringify(err));
  }
  try {
    connection.query(
      `INSERT INTO transacciones(cuenta_origen_id,cuenta_destino_id,monto,fecha_registro) VALUES (?,?,?,?)`,
      [data.SOURCE_ACCOUNT,data.DESTINATION_ACCOUNT,data.AMOUNT,data.DATE],
      (err: any, data: any, fils: any) => {
        console.log(err);
        console.log(data);
        console.log(fils);
        //res.sendStatus(data.affectedRows + 200)
        res.send("Completed...");
      }
    );
  } catch (error) {
    res.status(500).send("Ha habido un error...");
  }
});

export default transacciones;
