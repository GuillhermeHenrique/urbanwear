import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import classes from "./CategoryProducts.module.css";

import { toast } from "react-toastify";

import api from "../../utils/api";

// types
import type { AxiosError } from "axios";
import type { Product } from "../../types/Product";

const CategoryProducts = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState<Product[]>([]);

  const category =
    (categoryName?.charAt(0).toUpperCase() ?? "") +
    (categoryName?.slice(1) ?? "");

  const getProductsByCategory = async () => {
    try {
      const response = await api.get(`/products/categories/${categoryName}`);

      setProducts(response.data.products);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;

      const msgText =
        err.response?.data?.message || "An unexpected error occurred!";

      toast.error(msgText);
    }
  };

  useEffect(() => {
    getProductsByCategory();
  }, [categoryName]);

  return (
    <div className={classes.container}>
      <div className={classes.category}>
        <h2>{category}</h2>
      </div>
      {products.length > 0 ? (
        <div className={classes.products}>
          {products.map((product) => (
            <div key={product.id} className={classes.product}>
              <div className={classes.image}>
                <img
                  src={`${import.meta.env.VITE_API_URL}/images/products/${
                    product.images[1]
                  }`}
                  alt={product.name}
                />
              </div>
              <p>{product.name}</p>
              <div className={classes.availability}>
                {product.available ? <p>Available</p> : <p>Unavailable</p>}
              </div>
              <div className={classes.price}>
                <span>R$</span>
                <p>{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>There are no products in this category!</p>
      )}
    </div>
  );
};

export default CategoryProducts;
