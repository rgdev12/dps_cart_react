import React, { useState, useEffect } from "react";

export const ProductList = ({ allProducts, setAllProducts, countProducts, setCountProducts, total, setTotal }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://68805624f1dcae717b61a50d.mockapi.io/api/books');
        if (!response.ok) {
          throw new Error('Error al cargar los productos');
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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
      {loading && <p>Cargando productos...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && products.map(product => (
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
