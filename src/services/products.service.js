import * as productsModel from "../models/products.model.js";
import CustomError from "../utils/CustomError.js";

export const getAllProducts = async () => {
  try {
    return await productsModel.findAll();
  } catch (error) {
    throw new CustomError(
      "Error al obtener los productos desde la base de datos",
      500
    );
  }
};

export const getProductById = async (id) => {
  try {
    const product = await productsModel.findById(id);

    if (!product) {
      throw new CustomError(`No se encontro el producto con id ${id}`, 404);
    }

    return product;
  } catch (error) {
    if (error instanceof CustomError) throw error;
    throw new CustomError(
      "Error al obtener el producto desde la base de datos",
      500
    );
  }
};

export const createProduct = async (productData) => {
  try {
    return await productsModel.create(productData);
  } catch (error) {
    throw new CustomError(
      "Error al crear el producto en la base de datos",
      500
    );
  }
};

export const deleteProduct = async (id) => {
  try {
    const product = await productsModel.findById(id);

    if (!product) {
      throw new CustomError(`No se encontro el producto con id ${id}`, 404);
    }

    await productsModel.remove(id);
    return true;
  } catch (error) {
    if (error instanceof CustomError) throw error;
    throw new CustomError(
      "Error al eliminar el producto en la base de datos",
      500
    );
  }
};
