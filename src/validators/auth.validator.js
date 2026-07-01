import CustomError from "../utils/CustomError.js";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// La contrasena no debe contener espacios y debe tener al menos 6 caracteres
const PASSWORD_REGEX = /^\S{6,}$/;

export const validateLoginInput = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(
      new CustomError("Los campos email y password son obligatorios", 400)
    );
  }

  if (typeof email !== "string" || typeof password !== "string") {
    return next(
      new CustomError("Los campos email y password deben ser texto", 400)
    );
  }

  if (/\s/.test(email)) {
    return next(new CustomError("El email no debe contener espacios", 400));
  }

  if (!EMAIL_REGEX.test(email)) {
    return next(new CustomError("El formato del email no es valido", 400));
  }

  if (!PASSWORD_REGEX.test(password)) {
    return next(
      new CustomError(
        "La contrasena no debe contener espacios y debe tener al menos 6 caracteres",
        400
      )
    );
  }

  next();
};
