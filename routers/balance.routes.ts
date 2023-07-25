import express, { Request, Response, NextFunction } from "express";
import { Connection } from "../middlewares/classes/connection.js";
import { plainToClass } from "class-transformer";
import { Balance } from "../storage/balance.js";
import { validate } from "class-validator";

export const balance = express.Router();

let con: Connection;
let connection: any;

balance.use((req: Request, res: Response, next: NextFunction) => {
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

balance.get("/", async(req: Request, res: Response) => {
    try {
        var data = plainToClass(Balance, req.body, {
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
      `SELECT
          SUM(vc.monto) AS saldo_valuacion_costo,
          SUM(d.monto) AS saldo_devengado,
          SUM(p.valor) AS saldo_pasivos,
          SUM(a.valor) AS saldo_activos,
          SUM(pt.valor) AS saldo_patrimonio,
          SUM(e.monto) AS saldo_egresos,
          SUM(i.monto) AS saldo_ingresos
      FROM
          usuarios_cuentas uc
      LEFT JOIN
          valuacion_costo vc ON uc.cuenta_id = vc.cuenta_valuacion_costo_id
      LEFT JOIN
          devengado d ON uc.cuenta_id = d.cuenta_devengado_id
      LEFT JOIN
          pasivos p ON uc.cuenta_id = p.cuenta_pasivo_id
      LEFT JOIN
          activos a ON uc.cuenta_id = a.cuenta_activo_id
      LEFT JOIN
          patrimonio pt ON uc.cuenta_id = pt.cuenta_patrimonio_id
      LEFT JOIN
          egresos e ON uc.cuenta_id = e.cuenta_egreso_id
      LEFT JOIN
          ingresos i ON uc.cuenta_id = i.cuenta_ingreso_id
      WHERE
          uc.usuario_id = ?;
      `,
      [req.body.id],
      (err: any, data: any, fils: any) => {
        console.log(err);
        console.log(data);
        console.log(fils);
        //res.sendStatus(data.affectedRows + 200)
        res.send("Completed...");
      }
    );
  } catch (error) {
    res.status(500).send(error.message)
  }
});
