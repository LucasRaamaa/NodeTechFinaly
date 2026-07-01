import {
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import db from "../config/firebase.config.js";

const productsCollection = collection(db, "products");

export const findAll = async () => {
  const snapshot = await getDocs(productsCollection);
  return snapshot.docs.map((document) => ({
    id: document.id,
    ...document.data(),
  }));
};

export const findById = async (id) => {
  const productRef = doc(db, "products", id);
  const productSnap = await getDoc(productRef);

  if (!productSnap.exists()) {
    return null;
  }

  return { id: productSnap.id, ...productSnap.data() };
};

export const create = async (productData) => {
  const newProductRef = await addDoc(productsCollection, productData);
  return { id: newProductRef.id, ...productData };
};

export const remove = async (id) => {
  const productRef = doc(db, "products", id);
  await deleteDoc(productRef);
  return true;
};
