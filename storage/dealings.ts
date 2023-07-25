import { Expose, Type, Transform } from "class-transformer";
import {
  IsDefined,
  MaxLength,
  MinLength,
  IsNumber,
  IsEmail,
  IsString,
} from "class-validator";

export class Dealings {
  @Expose({ name: "cuenta_origen_id" })
  @IsNumber({}, {message: ()=>{ throw {status: 422, message: `El cuenta_origen_id no cumple con el formato`}}})
  @IsDefined({message: ()=>{ throw {status: 422, message: `El parametro cuenta_origen_id es obligatorio`}}})
  SOURCE_ACCOUNT: number;
  @Expose({ name: "cuenta_destino_id" })
  @IsNumber(
    {},
    {
      message: () => {
        throw { status: 422, message: `El cuenta_destino_id no cumple con el formato` };
      },
    }
  )
  @IsDefined({
    message: () => {
      throw { status: 422, message: `El parametro cuenta_destino_id es obligatorio` };
    },
  })
  DESTINATION_ACCOUNT: number;

  @Expose({ name: "monto" })
  @IsNumber(
    {},
    {
      message: () => {
        throw { status: 422, message: `El monto no cumple con el formato` };
      },
    }
  )
  @IsDefined({
    message: () => {
      throw { status: 422, message: "El parametro es obligatorio -> monto" };
    },
  })
  AMOUNT: number;

  @Expose({ name: "fecha_registro" })
  @Transform(({ value }) => {
    let data: any = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\s]+$/g.test(
      value
    );
    if (data) {
      return value;
    } else {
      throw {
        status: 500,
        message:
          "Error: Invalid data type or structure. Please ensure that the provided data matches the expected format. For more information, please visit https://github.com/miusarname/apifiltro#readme 1",
      };
    }
  })
  @IsDefined({
    message: () => {
      throw { status: 422, message: "El parametro es obligatorio -> fecha_registro" };
    },
  })
  DATE: string;

  @Expose({ name: "id" })
  @Transform(
    ({ value }) => {
      if (/^[0-9]|undefined+$/.test(value)) return (value) ? value : null;
      else
        throw {
          status: 406,
          message: `El datos titulos no cunple con los parametros acordados`,
        };
    },
    { toClassOnly: true }
  )
  Id: number;

  constructor(
    id: number,
    date: string,
    monto: number,
    destino: number,
    fuente: number
  ) {
    this.Id = id;
    this.DATE = date;
    this.AMOUNT = monto;
    this.DESTINATION_ACCOUNT = destino;
    this.SOURCE_ACCOUNT = fuente;
  }
}
