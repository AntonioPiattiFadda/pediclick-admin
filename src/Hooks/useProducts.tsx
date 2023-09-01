'use client';
import { useState, useEffect } from 'react';
import { getProducts } from '../Services/products.service';

const useProducts = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts().then((res) => {
      setProducts(res);
    });
  }, [products]);
  return products.map((product) => {
    return {
      id: product.id,
      name: product.name,
      image: product.image,
      description: product.description,
      price: product.price,
      category: product.category.name,
      blocked: product.blocked,
    };
  });
};

export default useProducts;
