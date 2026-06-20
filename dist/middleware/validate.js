"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = validate;
exports.validateQuery = validateQuery;
const zod_1 = require("zod");
const AppError_1 = require("../errors/AppError");
function validate(schema) {
    return (req, _res, next) => {
        try {
            req.body = schema.parse(req.body);
            next();
        }
        catch (err) {
            if (err instanceof zod_1.ZodError) {
                const errors = {};
                for (const issue of err.errors) {
                    const key = issue.path.join(".") || "root";
                    if (!errors[key])
                        errors[key] = [];
                    errors[key].push(issue.message);
                }
                next(new AppError_1.ValidationError(errors));
            }
            else {
                next(err);
            }
        }
    };
}
function validateQuery(schema) {
    return (req, _res, next) => {
        try {
            req.query = schema.parse(req.query);
            next();
        }
        catch (err) {
            if (err instanceof zod_1.ZodError) {
                const errors = {};
                for (const issue of err.errors) {
                    const key = issue.path.join(".") || "root";
                    if (!errors[key])
                        errors[key] = [];
                    errors[key].push(issue.message);
                }
                next(new AppError_1.ValidationError(errors));
            }
            else {
                next(err);
            }
        }
    };
}
//# sourceMappingURL=validate.js.map