export type Product = {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
  categoryId: number;
  blocked: boolean;
  category: object;
};

export type AddProduct = {
  name: string;
  image: string;
  description: string;
  price: number;
  categoryId: number;
};

export type UpdateProduct = {
  name?: string;
  image?: string;
  description?: string;
  price?: number;
  categoryId?: number;
  blocked?: boolean;
};

export type Auth = {
  signIn: () => string;
  user: string;
};
