"use client";
import { useState } from "react";
import React from "react";

export const Header = ({ allProducts, setAllProducts, total, countProducts, setCountProducts, setTotal, user, onLogout }) => {
  const [active, setActive] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const onDeleteProduct = product => {
    const result = allProducts.filter(item => item.id !== product.id);

    setTotal(total - product.price * product.quantity);
    setCountProducts(countProducts - product.quantity);
    setAllProducts(result);
  }

  const onCleanCart = () => {
    setAllProducts([]);
    setTotal(0);
    setCountProducts(0);
  }

  return (
    <header>
      <div className="max-w-full sm:max-w-5xl mx-auto flex justify-between align-center p-5">
        <h1 className="font-bold text-2xl">Tienda de Libros</h1>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {/* Información del usuario */}
          {user && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ textAlign: 'right' }}>
                <p style={{ 
                  margin: 0, 
                  fontSize: '14px', 
                  fontWeight: '500',
                  color: '#374151'
                }}>
                  Bienvenido, {user.name}
                </p>
                <p style={{ 
                  margin: 0, 
                  fontSize: '12px', 
                  color: '#6b7280'
                }}>
                  {user.email}
                </p>
              </div>
              <button
                onClick={onLogout}
                style={{
                  backgroundColor: '#dc2626',
                  color: 'white',
                  border: 'none',
                  padding: '8px 12px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#b91c1c'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#dc2626'}
              >
                Cerrar Sesión
              </button>
            </div>
          )}

          <div className="container-icon">
            <div className="container-cart-icon" onClick={() => setActive(!active)}>
              <img src="https://w7.pngwing.com/pngs/275/763/png-transparent-cart-shopping-supermarket-shopping-cart-ecommerce-e-commerce-shopping-trolley-caddy.png" alt="carrito" className="icon-cart" />
              <div className="count-products">
                <span id="contador-productos">{countProducts}</span>
              </div>
            </div>

            <div className={`container-cart-products ${active ? '' : 'hidden-cart'}`}>
              {allProducts.length ? (
                <>
                  <div className="row-product">
                    {allProducts.map(product => (
                      <div className="cart-product" key={product.id}>
                        <div className="info-cart-product">
                          <span className="cantidad-producto-carrito">
                            {product.quantity}
                          </span>
                          <p className="titulo-producto-carrito">{product.title}</p>
                          <span className="precio-producto-carrito">
                            ${product.price}
                          </span>
                        </div>
                        <img src="https://static.vecteezy.com/system/resources/previews/018/887/462/original/signs-close-icon-png.png"
                             alt="cerrar"
                             className="icon-close"
                             onClick={() => onDeleteProduct(product)}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="cart-total">
                    <h3>Total:</h3>
                    <span className="total-pagar">${total}</span>
                    <button 
                      className="btn-detail-cart ml-2" 
                      onClick={() => setShowModal(true)}
                      style={{
                        backgroundColor: '#2563eb',
                        color: 'white',
                        border: 'none',
                        padding: '8px 12px',
                        borderRadius: '4px',
                        marginLeft: '10px',
                        cursor: 'pointer',
                        fontSize: '12px'
                      }}
                    >
                      Ver Detalle
                    </button>
                  </div>

                  <button className="btn-clear-all" onClick={onCleanCart}>
                    Vaciar Carrito
                  </button>
                </>
              ) : (
                <p className="cart-empty">El carrito está vacío</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Detalle de Factura */}
      {showModal && (
        <div 
          className="modal-overlay"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
          }}
          onClick={() => setShowModal(false)}
        >
          <div 
            className="modal-content"
            style={{
              backgroundColor: 'white',
              padding: '30px',
              borderRadius: '8px',
              maxWidth: '500px',
              width: '90%',
              maxHeight: '80vh',
              overflowY: 'auto',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header del Modal */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold' }}>Detalle de Compra</h2>
              <button 
                onClick={() => setShowModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  padding: '0',
                  width: '30px',
                  height: '30px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                ×
              </button>
            </div>

            {/* Información de la tienda */}
            <div style={{ textAlign: 'center', marginBottom: '20px', paddingBottom: '15px', borderBottom: '2px solid #e5e7eb' }}>
              <h3 style={{ margin: '0 0 5px 0', fontSize: '18px' }}>Tienda de Libros</h3>
              <p style={{ margin: 0, fontSize: '14px', color: '#6b7280' }}>Factura de Compra</p>
              <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#6b7280' }}>
                Fecha: {new Date().toLocaleDateString('es-ES')}
              </p>
            </div>

            {/* Lista de productos */}
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ marginBottom: '15px', fontSize: '16px', fontWeight: '600' }}>Productos:</h4>
              {allProducts.map(product => (
                <div 
                  key={product.id} 
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '10px 0',
                    borderBottom: '1px solid #f3f4f6'
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: '0 0 5px 0', fontWeight: '500', fontSize: '14px' }}>{product.title}</p>
                    <p style={{ margin: 0, fontSize: '12px', color: '#6b7280' }}>
                      ${product.price} × {product.quantity}
                    </p>
                  </div>
                  <div style={{ fontWeight: '600', fontSize: '14px' }}>
                    ${(product.price * product.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            {/* Resumen de totales */}
            <div style={{ borderTop: '2px solid #e5e7eb', paddingTop: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ fontSize: '14px' }}>Subtotal:</span>
                <span style={{ fontSize: '14px' }}>${total.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ fontSize: '14px' }}>Total de artículos:</span>
                <span style={{ fontSize: '14px' }}>{countProducts}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 'bold', marginTop: '15px', paddingTop: '15px', borderTop: '1px solid #e5e7eb' }}>
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
