import { body } from "express-validator";

export const usuarioValidation = [
  body("nombre")
    .notEmpty().withMessage("El nombre es obligatorio"),

  body("apellidos")
    .notEmpty().withMessage("Los apellidos son obligatorios"),

  body("email")
    .isEmail().withMessage("Debe ser un email válido"),

  body("dni")
    .isLength({ min: 8, max: 8 }).withMessage("El DNI debe tener 8 dígitos")
    .isNumeric().withMessage("El DNI solo puede contener números"),

  body("celular")
    .matches(/^9\d{8}$/).withMessage("El celular debe tener 9 dígitos y empezar con 9"),

  body("contrasena")
    .isLength({ min: 8 }).withMessage("La contraseña debe tener al menos 8 caracteres")
    .matches(/[A-Z]/).withMessage("La contraseña debe contener al menos una mayúscula")
    .matches(/[a-z]/).withMessage("La contraseña debe contener al menos una minúscula")
    .matches(/[0-9]/).withMessage("La contraseña debe contener al menos un número")
    .matches(/[\W_]/).withMessage("La contraseña debe contener al menos un carácter especial"),

  body("tipo_usuario")
    .isIn(["Particular", "Agente"])
    .withMessage("Tipo de usuario no válido"),
];
