import express, { Request, Response, NextFunction } from "express";
import { Connection } from "../middlewares/classes/connection.js";
import { plainToClass } from "class-transformer";
import { Counts } from "../storage/counts.js";

const cuentas = express.Router();

let con: Connection;
let connection: any;

//connection DB
cuentas.use((req: Request, res: Response, next: NextFunction) => {
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

//routes
cuentas.get("/", (req: Request, res: Response) => {
  try {
    connection.query(
      `SELECT * FROM cuentas`,
      [req.body.nom_com, req.body.edad],
      (err: any, data: any, fils: any) => {
        console.log(err);
        console.log(data);
        console.log(fils);
        res.send(data);
      }
    );
  } catch (error) {
    res.sendStatus(500).send("Ha habido un error...");
  }
});

cuentas.post("/", (req: Request, res: Response) => {
  try {
    var { NAME, TyPE } = plainToClass(Counts, req.body)
    console.log(NAME + "  /n" + TyPE);
  } catch (error) {
    console.log("error ->", error);
  }
  try {
    connection.query(
      `INSERT INTO cuentas(nombre,tipo) VALUES (?,?)`,
      [NAME, TyPE],
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

cuentas.put("/", (req: Request, res: Response) => {
  try {
    var { NAME, TyPE, Id } = plainToClass(Counts, req.body)
  } catch (error) {
    console.log("error ->", error);
  }
  try {
    connection.query(
      `UPDATE cuentas SET nombre = ?,tipo = ? WHERE id = ?;`,
      [NAME, TyPE, Id],
      (err: any, data: any, fils: any) => {
        console.log(err);
        console.log(data);
        console.log(fils);
        //res.sendStatus(data.affectedRows + 200)
        res.send("Completed...");
      }
    );
  } catch (error) {}
});

cuentas.delete("/", (req: Request, res: Response) => {
  try {
    var { Id } = plainToClass(Counts, req.body);
  } catch (error) {
    console.log("error ->", error);
  }
  try {
    connection.query(
      `DELETE FROM cuentas WHERE id = ?`,
      [Id],
      (err: any, data: any, fils: any) => {
        console.log(err);
        console.log(data);
        console.log(fils);
        //res.sendStatus(data.affectedRows + 200)
        res.send("Completed...");
      }
    );
  } catch (error) {}
});

export default cuentas;
