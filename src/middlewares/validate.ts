// imported from https://github.com/mini-repos/custom-expressjs-validator

import { Request, Response, NextFunction } from "express";

export function validateKeyInputs({ inputArr, key: field }: { inputArr: string[], key: "body" | "query" | "params" }) {
    return (req: Request, res: Response, next: NextFunction) => {
        req["validData"] = {};
        if (!inputArr || inputArr.length === 0) {
            return next();
        }
        let errors: any[] = [];
        inputArr.forEach((input) => {
            if (!(String(input).startsWith("-"))) {
                if ([undefined, null, ""].includes(req[field][input])) {
                    errors.push(input);
                }
                req["validData"][input] = req[field][input];
                return;
            }
            const key = String(input).replace("-", "");
            if (!([undefined, null, ""].includes(req[field][key]))) {
                req["validData"][key] = req[field][key];
            }
        });
        if (errors.length > 0) {
            return res.status(400).json({
                status: "error",
                message: "provide the correct parameters",
                missedInputs: errors
            });
        }
        return next();
    }
}

