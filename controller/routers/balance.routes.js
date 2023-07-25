var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
import { Connection } from "../middlewares/classes/connection.js";
import { plainToClass } from "class-transformer";
import { Balance } from "../storage/balance.js";
import { validate } from "class-validator";
export const balance = express.Router();
let con;
let connection;
balance.use((req, res, next) => {
    try {
        con = new Connection(process.env.DB_HOST, process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD);
        connection = con.connection;
        next();
    }
    catch (error) {
        res.sendStatus(500);
        res.send(error);
    }
});
balance.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var data = plainToClass(Balance, req.body, {
            excludeExtraneousValues: true,
        });
        console.log(data);
        req.body = data;
        yield validate(data);
    }
    catch (err) {
        res.status(500).send(JSON.stringify(err));
    }
    try {
        connection.query(`SELECT
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
      `, [req.body.id], (err, data, fils) => {
            console.log(err);
            console.log(data);
            console.log(fils);
            //res.sendStatus(data.affectedRows + 200)
            res.send("Completed...");
        });
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
