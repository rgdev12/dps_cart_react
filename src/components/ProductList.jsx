import React, { useState, useEffect } from "react";

export const ProductList = ({ allProducts, setAllProducts, countProducts, setCountProducts, total, setTotal }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://68805624f1dcae717b61a50d.mockapi.io/api/restaurant');
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
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '40px 20px'
    }}>
      {loading && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
          background: 'rgba(255, 255, 255, 0.9)',
          borderRadius: '15px',
          border: '2px solid #fbbf24',
          textAlign: 'center'
        }}>
          <div style={{ 
            fontSize: '48px', 
            marginBottom: '20px'
          }}>🥡</div>
          <p style={{
            fontSize: '18px',
            color: '#dc2626',
            fontWeight: '600',
            margin: 0,
            fontFamily: '"Trebuchet MS", sans-serif'
          }}>
            Preparando el menú...
          </p>
        </div>
      )}
      
      {error && (
        <div style={{
          background: 'linear-gradient(135deg, #fecaca 0%, #f87171 100%)',
          border: '2px solid #dc2626',
          borderRadius: '15px',
          padding: '20px',
          textAlign: 'center',
          margin: '20px 0'
        }}>
          <span style={{ fontSize: '32px', marginBottom: '10px', display: 'block' }}>😔</span>
          <p style={{
            fontSize: '16px',
            color: '#7f1d1d',
            fontWeight: '600',
            margin: 0
          }}>
            Error: {error}
          </p>
        </div>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {!loading && !error && products.map(product => (
          <div 
            key={product.id}
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(254, 243, 199, 0.95) 100%)',
              border: '3px solid #f59e0b',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 8px 20px rgba(220, 38, 38, 0.15)',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              position: 'relative'
            }}
          >
            {/* Decoración superior */}
            <div style={{
              background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
              height: '8px',
              width: '100%'
            }} />
            
            <figure style={{ 
              margin: 0, 
              position: 'relative',
              overflow: 'hidden',
              height: '200px'
            }}>
              <img 
                src={product.urlImage} 
                alt={product.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
              />
              {/* Overlay con emoji */}
              <div style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: 'rgba(220, 38, 38, 0.9)',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px'
              }}>
                🍜
              </div>
            </figure>
            
            <div style={{ 
              padding: '20px',
              textAlign: 'center' 
            }}>
              <h2 style={{
                margin: '0 0 12px 0',
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#7c2d12',
                lineHeight: '1.3',
                fontFamily: '"Trebuchet MS", sans-serif',
                minHeight: '45px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {product.title}
              </h2>

              <p>{product.description}</p>
              
              <div style={{
                background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                padding: '8px 16px',
                borderRadius: '25px',
                margin: '15px 0',
                border: '2px solid #dc2626',
                display: 'inline-block'
              }}>
                <p style={{
                  margin: 0,
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: '#7c2d12',
                  fontFamily: '"Trebuchet MS", sans-serif'
                }}>
                  💰 ${product.price}
                </p>
              </div>
              
              <button 
                onClick={() => onAddProduct(product)}
                style={{
                  background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
                  color: '#fbbf24',
                  border: '3px solid #fbbf24',
                  padding: '12px 24px',
                  borderRadius: '30px',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  fontFamily: '"Trebuchet MS", sans-serif'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'linear-gradient(135deg, #991b1b 0%, #7f1d1d 100%)';
                  e.target.style.transform = 'scale(1.05)';
                  e.target.style.boxShadow = '0 6px 15px rgba(220, 38, 38, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)';
                  e.target.style.transform = 'scale(1)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                <span>🛒</span>
                Añadir al carrito
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
