var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Transform, Expose } from "class-transformer";
export class Counts {
    constructor(p1, p2, p4) {
        this.NAME = p1;
        this.TyPE = p2;
        this.Id = p4;
    }
}
__decorate([
    Expose({ name: "nombre" }),
    Transform(({ value }) => {
        let data = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\s]+$/g
            .test(value);
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
    __metadata("design:type", String)
], Counts.prototype, "NAME", void 0);
__decorate([
    Expose({ name: "tipo" }),
    Transform(({ value }) => {
        let data = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/g.test(value);
        if (data) {
            return value;
        }
        else {
            throw {
                status: 500,
                message: "Error: Invalid data type or structure. Please ensure that the provided data matches the expected format. For more information, please visit https://github.com/miusarname/apifiltro#readme 2",
            };
        }
    }),
    __metadata("design:type", String)
], Counts.prototype, "TyPE", void 0);
__decorate([
    Expose({ name: "id" }),
    Transform(({ value }) => {
        let data = /^[0-9]+$/g.test(value);
        if (data) {
            return parseInt(value);
        }
        else if (value === undefined || value === null) {
        }
        else {
            throw {
                status: 500,
                message: "Error: Invalid data type or structure. Please ensure that the provided data matches the expected format. For more information, please visit https://github.com/miusarname/apifiltro#readme 3",
            };
        }
    }),
    __metadata("design:type", Object)
], Counts.prototype, "Id", void 0);
