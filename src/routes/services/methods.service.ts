import { getComponent } from "../components";

export interface Method {
    methodType: string
    idx: number

}

export interface MethodFunctions {
    create(m: Method): void;
    update(m: Method): void;
    delete(m: Method): void;
}

function NewMethodFunctions(){
    return {
        create: function (m: Method): void {
            throw new Error("Function not implemented.");
        },
        update: function (m: Method): void {
            throw new Error("Function not implemented.");
        },
        delete: function (m: Method): void {
            throw new Error("Function not implemented.");
        }
    }
}

export class MethodService {

    methods = []
    fnMethods: MethodFunctions = NewMethodFunctions()

    constructor(fnMethods: MethodFunctions) {
        this.fnMethods = fnMethods
    }

    create(m: string, idx: number){
        let method: Method = {
            methodType: m,
            idx: idx
        }
        this.fnMethods.create(method)
    }

}