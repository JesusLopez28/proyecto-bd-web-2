import type { Model, ObjectId } from "mongoose";
import { Category } from "./category.type";
import e from "express";

export type Product = {
  id?: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  category: Category;
};

export type ProductInCart = {
  product: ObjectId;
  quantity: number;
};

export type ProductRequestType = e.Request & {
  product: Product;
};

export type ProductMethods = {
  toClient: () => Product;
};

export type ProductModel = Model<Product>;
