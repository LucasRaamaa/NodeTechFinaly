import CustomError from "../utils/CustomError.js";

export const validateCreateProduct = (req, res, next) => {
  const { name, price, stock } = req.body;

  if (!name || typeof name !== "string" || !name.trim()) {
    return next(
      new CustomError("El campo name es obligatorio y debe ser texto", 400)
    );
  }

  if (price === undefined || typeof price !== "number" || price < 0) {
    return next(
      new CustomError(
        "El campo price es obligatorio y debe ser un numero positivo",
        400
      )
    );
  }

  if (stock !== undefined && (typeof stock !== "number" || stock < 0)) {
    return next(
      new CustomError("El campo stock debe ser un numero positivo", 400)
    );
  }

  next();
};

export const validateIdParam = (req, res, next) => {
  const { id } = req.params;

  if (!id || typeof id !== "string" || !id.trim()) {
    return next(new CustomError("El parametro id es invalido", 400));
  }

  next();
};
