import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import productsRoutes from "./src/routes/products.routes.js";
import authRoutes from "./src/routes/auth.routes.js";
import { errorHandler, notFoundHandler } from "./src/middlewares/error.middleware.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globales
app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use("/api/products", productsRoutes);
app.use("/auth", authRoutes);

// Ruta base de verificacion
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "API de productos funcionando correctamente",
  });
});

// Manejo de rutas no definidas
app.use(notFoundHandler);

// Manejo global de errores
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
