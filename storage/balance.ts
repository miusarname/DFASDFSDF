import { Expose, Type, Transform } from "class-transformer";
import { IsDefined, IsNumber } from "class-validator";

export class Balance {
  @Expose({ name: "id" })
  @IsNumber(
    {},
    {
      message: () => {
        throw {
          status: 422,
          message: `El cuenta_origen_id no cumple con el formato`,
        };
      },
    }
  )
  @IsDefined({
    message: () => {
      throw {
        status: 422,
        message: `El parametro cuenta_origen_id es obligatorio`,
      };
    },
  })
  ID: number;

  constructor(id: number) {
    this.ID = id;
  }
}
