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
import { Dealings } from "../storage/dealings.js";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
const transacciones = express.Router();
let con;
let connection;
//connection DB
transacciones.use((req, res, next) => {
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
transacciones.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var data = plainToClass(Dealings, req.body, {
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
        connection.query(`INSERT INTO transacciones(cuenta_origen_id,cuenta_destino_id,monto,fecha_registro) VALUES (?,?,?,?)`, [data.SOURCE_ACCOUNT, data.DESTINATION_ACCOUNT, data.AMOUNT, data.DATE], (err, data, fils) => {
            console.log(err);
            console.log(data);
            console.log(fils);
            //res.sendStatus(data.affectedRows + 200)
            res.send("Completed...");
        });
    }
    catch (error) {
        res.status(500).send("Ha habido un error...");
    }
}));
export default transacciones;
