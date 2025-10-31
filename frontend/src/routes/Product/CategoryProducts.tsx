import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { toast } from "react-toastify";

import api from "../../utils/api";

// types
import type { AxiosError } from "axios";
import type { Product } from "../../types/Product";

const CategoryProducts = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState<Product[]>([]);

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
    <>
      <h1>
        {products.map((product) => (
          <div className="container">
            <h2>{product.name}</h2>
          </div>
        ))}
      </h1>
    </>
  );
};

export default CategoryProducts;
