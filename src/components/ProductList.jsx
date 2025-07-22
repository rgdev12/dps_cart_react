import React from "react";
import { data } from "../app/data";

export const ProductList = ({ allProducts, setAllProducts, countProducts, setCountProducts, total, setTotal }) => {
  const onAddProduct = product => {
    if (allProducts.find(item => item.id === product.id)) {
      const products = allProducts.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);

      setTotal(total + product.price * product.quantity);
      setCountProducts(countProducts + product.quantity);
      return setAllProducts([...products]);
    }

    setTotal(total + product.price * product.quantity);
    setCountProducts(countProducts + product.quantity);
    setAllProducts([...allProducts, product]);
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-full sm:max-w-5xl mx-auto my-5 p-3">
      {data.map(product => (
        <div className="item border" key={product.id}>
          <figure>
            <img src={product.urlImage} alt={product.title} />
          </figure>
          
          <div className="info-product">
            <h2 className="titulo-producto-carrito leading-none">{product.title}</h2>
            <p className="price">${product.price}</p>
            <button className="btn-add-cart" onClick={() => onAddProduct(product)}>Añadir al carrito</button>
          </div>
        </div>
      ))}
    </div>
  );
}
