var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Expose, Transform } from "class-transformer";
import { IsDefined, IsNumber, } from "class-validator";
export class Dealings {
    constructor(id, date, monto, destino, fuente) {
        this.Id = id;
        this.DATE = date;
        this.AMOUNT = monto;
        this.DESTINATION_ACCOUNT = destino;
        this.SOURCE_ACCOUNT = fuente;
    }
}
__decorate([
    Expose({ name: "cuenta_origen_id" }),
    IsNumber({}, { message: () => { throw { status: 422, message: `El cuenta_origen_id no cumple con el formato` }; } }),
    IsDefined({ message: () => { throw { status: 422, message: `El parametro cuenta_origen_id es obligatorio` }; } }),
    __metadata("design:type", Number)
], Dealings.prototype, "SOURCE_ACCOUNT", void 0);
__decorate([
    Expose({ name: "cuenta_destino_id" }),
    IsNumber({}, {
        message: () => {
            throw { status: 422, message: `El cuenta_destino_id no cumple con el formato` };
        },
    }),
    IsDefined({
        message: () => {
            throw { status: 422, message: `El parametro cuenta_destino_id es obligatorio` };
        },
    }),
    __metadata("design:type", Number)
], Dealings.prototype, "DESTINATION_ACCOUNT", void 0);
__decorate([
    Expose({ name: "monto" }),
    IsNumber({}, {
        message: () => {
            throw { status: 422, message: `El monto no cumple con el formato` };
        },
    }),
    IsDefined({
        message: () => {
            throw { status: 422, message: "El parametro es obligatorio -> monto" };
        },
    }),
    __metadata("design:type", Number)
], Dealings.prototype, "AMOUNT", void 0);
__decorate([
    Expose({ name: "fecha_registro" }),
    Transform(({ value }) => {
        let data = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\s]+$/g.test(value);
        if (data) {
            return value;
        }
        else {
            throw {
                status: 500,
                message: "Error: Invalid data type or structure. Please ensure that the provided data matches the expected format. For more information, please visit https://github.com/miusarname/apifiltro#readme 1",
            };
        }
    }),
    IsDefined({
        message: () => {
            throw { status: 422, message: "El parametro es obligatorio -> fecha_registro" };
        },
    }),
    __metadata("design:type", String)
], Dealings.prototype, "DATE", void 0);
__decorate([
    Expose({ name: "id" }),
    Transform(({ value }) => {
        if (/^[0-9]|undefined+$/.test(value))
            return (value) ? value : null;
        else
            throw {
                status: 406,
                message: `El datos titulos no cunple con los parametros acordados`,
            };
    }, { toClassOnly: true }),
    __metadata("design:type", Number)
], Dealings.prototype, "Id", void 0);
