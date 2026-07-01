import dotenv from "dotenv";

dotenv.config();

// El usuario administrador se define mediante variables de entorno
// para no exponer credenciales sensibles dentro del codigo fuente.
const adminUser = {
  email: process.env.ADMIN_EMAIL,
  password: process.env.ADMIN_PASSWORD,
};

export const findUserByEmail = (email) => {
  if (email === adminUser.email) {
    return adminUser;
  }
  return null;
};
