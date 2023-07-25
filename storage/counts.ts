import { Type, Transform, Expose } from "class-transformer";

export class Counts {
  @Expose({ name: "nombre" })
  @Transform(({ value }) => {
    let data: any = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\s]+$/g
    .test(
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
  NAME: string;

  @Expose({ name: "tipo" })
  @Transform(({ value }) => {
    let data: any = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/g.test(
      value
    );
    if (data) {
      return value;
    } else {
      throw {
        status: 500,
        message:
          "Error: Invalid data type or structure. Please ensure that the provided data matches the expected format. For more information, please visit https://github.com/miusarname/apifiltro#readme 2",
      };
    }
  })
  TyPE: string;

  @Expose({ name: "id" })
  @Transform(({ value }) => {
    let data: any = /^[0-9]+$/g.test(value);
    if (data) {
      return parseInt(value);
    } else if (value === undefined || value === null) {
    } else {
      throw {
        status: 500,
        message:
          "Error: Invalid data type or structure. Please ensure that the provided data matches the expected format. For more information, please visit https://github.com/miusarname/apifiltro#readme 3",
      };
    }
  })
  Id: any;

  constructor(p1: string, p2: string, p4: any) {
    this.NAME = p1;
    this.TyPE = p2;
    this.Id = p4;
  }
}
