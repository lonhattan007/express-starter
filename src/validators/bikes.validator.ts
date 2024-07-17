import { param, query, ValidationChain } from "express-validator";

export const bikeIdValidator = param("bikeId")
  .notEmpty()
  .bail()
  .isInt({ min: 1 })
  .withMessage("Bike Id must be a positive integer");

export function pageInfoValidator(
  field: string,
  defaultValue: number,
): ValidationChain {
  return query(field)
    .customSanitizer((value: any) =>
      typeof value === "undefined" ? defaultValue.toString() : value,
    )
    .isInt({ min: 1 })
    .withMessage(`${field} must be a positive integer`)
    .bail()
    .toInt();
}
