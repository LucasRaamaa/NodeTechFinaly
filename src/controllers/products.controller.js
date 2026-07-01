import * as productsService from "../services/products.service.js";

export const getProducts = async (req, res, next) => {
  try {
    const products = await productsService.getAllProducts();
    res.status(200).json({ status: "success", data: products });
  } catch (error) {
    next(error);
  }
};

export const getProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await productsService.getProductById(id);
    res.status(200).json({ status: "success", data: product });
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const newProduct = await productsService.createProduct(req.body);
    res.status(201).json({ status: "success", data: newProduct });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    await productsService.deleteProduct(id);
    res
      .status(200)
      .json({ status: "success", message: `Producto ${id} eliminado` });
  } catch (error) {
    next(error);
  }
};
