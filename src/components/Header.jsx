"use client";
import { useState } from "react";
import React from "react";

export const Header = ({ allProducts, setAllProducts, total, countProducts, setCountProducts, setTotal, user, onLogout }) => {
  const [active, setActive] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalDeleteProduct, setShowModalDeleteProduct] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [showModalCleanCart, setShowModalCleanCart] = useState(false);

  const onDeleteProduct = () => {
    const result = allProducts.filter(item => item.id !== productToDelete.id);

    setTotal(total - productToDelete.price * productToDelete.quantity);
    setCountProducts(countProducts - productToDelete.quantity);
    setAllProducts(result);

    setProductToDelete(null);
    setShowModalDeleteProduct(false);
  }

  const handleDeleteProduct = (product) => {
    setProductToDelete(product);
    setShowModalDeleteProduct(true);
  }

  const handleCleanCart = () => {
    onCleanCart();
    setShowModalCleanCart(false);
  }

  const onCleanCart = () => {
    setAllProducts([]);
    setTotal(0);
    setCountProducts(0);
  }

  return (
    <header style={{
      background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
      boxShadow: '0 4px 12px rgba(220, 38, 38, 0.3)',
      borderBottom: '3px solid #fbbf24'
    }}>
      <div className="max-w-full sm:max-w-5xl mx-auto flex justify-between items-center p-5">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '28px' }}>🥡</span>
          <h1 className="font-bold text-2xl" style={{ 
            color: '#fbbf24',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            fontFamily: '"Trebuchet MS", sans-serif'
          }}>
            China Express
          </h1>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {/* Información del usuario */}
          {user && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ textAlign: 'right' }}>
                <p style={{ 
                  margin: 0, 
                  fontSize: '14px', 
                  fontWeight: '500',
                  color: '#fbbf24'
                }}>
                  欢迎 (Bienvenido), {user.username}
                </p>
                <p style={{ 
                  margin: 0, 
                  fontSize: '12px', 
                  color: '#fed7aa'
                }}>
                  {user.email}
                </p>
              </div>
            </div>
          )}

          <div className="container-icon">
            <div className="container-cart-icon" onClick={() => setActive(!active)} style={{
              background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
              borderRadius: '50%',
              padding: '12px',
              border: '2px solid #dc2626',
              boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
              cursor: 'pointer',
              transition: 'transform 0.2s',
              position: 'relative'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            >
              <span style={{ fontSize: '24px' }}>🥡</span>
              <div className="count-products" style={{
                position: 'absolute',
                top: '-8px',
                right: '-8px',
                background: '#dc2626',
                color: 'white',
                borderRadius: '50%',
                width: '24px',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: 'bold',
                border: '2px solid #fbbf24'
              }}>
                <span id="contador-productos">{countProducts}</span>
              </div>
            </div>

            <div className={`container-cart-products ${active ? '' : 'hidden-cart'}`} style={{
              background: 'linear-gradient(135deg, #fef3c7 0%, #fbbf24 100%)',
              border: '2px solid #dc2626',
              borderRadius: '12px',
              boxShadow: '0 8px 25px rgba(220, 38, 38, 0.3)',
              position: 'absolute',
              top: '100%',
              right: '0',
              marginTop: '10px',
              minWidth: '300px',
              maxWidth: '400px',
              zIndex: 1000
            }}>
              {allProducts.length ? (
                <>
                  <div className="row-product" style={{ padding: '15px' }}>
                    <h3 style={{ 
                      margin: '0 0 15px 0', 
                      fontSize: '18px', 
                      color: '#dc2626',
                      textAlign: 'center',
                      borderBottom: '2px solid #dc2626',
                      paddingBottom: '8px',
                      fontFamily: '"Trebuchet MS", sans-serif'
                    }}>
                      🥢 Tu Pedido
                    </h3>
                    {allProducts.map(product => (
                      <div className="cart-product" key={product.id} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '12px',
                        margin: '8px 0',
                        background: 'rgba(255, 255, 255, 0.8)',
                        borderRadius: '8px',
                        border: '1px solid #f59e0b',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                      }}>
                        <div className="info-cart-product" style={{ flex: 1 }}>
                          <span className="cantidad-producto-carrito" style={{
                            background: '#dc2626',
                            color: 'white',
                            padding: '4px 8px',
                            borderRadius: '20px',
                            fontSize: '12px',
                            fontWeight: 'bold',
                            marginRight: '10px'
                          }}>
                            {product.quantity}x
                          </span>
                          <p className="titulo-producto-carrito" style={{
                            margin: '5px 0',
                            fontWeight: '500',
                            color: '#7c2d12',
                            fontSize: '14px'
                          }}>{product.title}</p>
                          <span className="precio-producto-carrito" style={{
                            color: '#dc2626',
                            fontWeight: 'bold',
                            fontSize: '14px'
                          }}>
                            ${product.price}
                          </span>
                        </div>
                        <button
                             style={{
                               background: 'none',
                               border: 'none',
                               fontSize: '18px',
                               color: '#dc2626',
                               cursor: 'pointer',
                               padding: '5px',
                               borderRadius: '50%',
                               width: '30px',
                               height: '30px',
                               display: 'flex',
                               alignItems: 'center',
                               justifyContent: 'center'
                             }}
                             onClick={() => handleDeleteProduct(product)}
                             onMouseEnter={(e) => e.target.style.background = '#fee2e2'}
                             onMouseLeave={(e) => e.target.style.background = 'none'}
                        >
                          ❌
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="cart-total" style={{
                    background: 'rgba(220, 38, 38, 0.1)',
                    padding: '15px',
                    borderRadius: '8px',
                    margin: '15px',
                    border: '2px solid #dc2626'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h3 style={{ 
                        margin: 0, 
                        color: '#dc2626',
                        fontSize: '16px',
                        fontFamily: '"Trebuchet MS", sans-serif'
                      }}>
                        Total:
                      </h3>
                      <span className="total-pagar" style={{
                        fontSize: '18px',
                        fontWeight: 'bold',
                        color: '#dc2626'
                      }}>${total}</span>
                    </div>
                    <button 
                      className="btn-detail-cart" 
                      onClick={() => setShowModal(true)}
                      style={{
                        backgroundColor: '#dc2626',
                        color: '#fbbf24',
                        border: '2px solid #fbbf24',
                        padding: '10px 15px',
                        borderRadius: '25px',
                        marginTop: '10px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        width: '50%',
                        transition: 'all 0.3s',
                        fontFamily: '"Trebuchet MS", sans-serif'
                      }}
                    >
                      📋 Ver Factura
                    </button>
                  </div>

                  <button className="btn-clear-all" onClick={() => setShowModalCleanCart(true)} style={{
                    backgroundColor: '#f59e0b',
                    color: '#7c2d12',
                    border: '2px solid #dc2626',
                    padding: '10px 15px',
                    borderRadius: '25px',
                    margin: '0 15px 15px 15px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    width: 'calc(100% - 30px)',
                    transition: 'all 0.3s',
                    fontFamily: '"Trebuchet MS", sans-serif'
                  }}
                  >
                    🗑️ Vaciar Carrito
                  </button>
                </>
              ) : (
                <div style={{ padding: '30px', textAlign: 'center' }}>
                  <span style={{ fontSize: '48px', marginBottom: '15px', display: 'block' }}>🥡</span>
                  <p className="cart-empty" style={{
                    color: '#dc2626',
                    fontSize: '16px',
                    fontWeight: '500',
                    margin: 0,
                    fontFamily: '"Trebuchet MS", sans-serif'
                  }}>
                    Tu carrito está vacío
                  </p>
                  <p style={{
                    color: '#7c2d12',
                    fontSize: '14px',
                    margin: '5px 0 0 0'
                  }}>
                    ¡Añade algunos deliciosos platos!
                  </p>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={onLogout}
            style={{
              background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              color: '#7c2d12',
              border: '2px solid #dc2626',
              padding: '10px 15px',
              borderRadius: '25px',
              fontSize: '14px',
              cursor: 'pointer',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.3s',
              fontFamily: '"Trebuchet MS", sans-serif'
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-logout">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
              <path d="M9 12h12l-3 -3" />
              <path d="M18 15l3 -3" />
            </svg>

          </button>
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
              background: 'linear-gradient(135deg, #fef3c7 0%, #fbbf24 100%)',
              padding: '30px',
              borderRadius: '15px',
              maxWidth: '500px',
              width: '90%',
              maxHeight: '80vh',
              overflowY: 'auto',
              boxShadow: '0 20px 40px rgba(220, 38, 38, 0.3)',
              border: '3px solid #dc2626'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header del Modal */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '32px' }}>🧾</span>
                <h2 style={{ 
                  margin: 0, 
                  fontSize: '24px', 
                  fontWeight: 'bold',
                  color: '#dc2626',
                  fontFamily: '"Trebuchet MS", sans-serif'
                }}>
                  账单 - Factura
                </h2>
              </div>
              <button 
                onClick={() => setShowModal(false)}
                style={{
                  background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
                  border: '2px solid #fbbf24',
                  fontSize: '20px',
                  color: '#fbbf24',
                  cursor: 'pointer',
                  padding: '8px',
                  width: '35px',
                  height: '35px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  fontWeight: 'bold'
                }}
              >
                ✕
              </button>
            </div>

            {/* Información de la tienda */}
            <div style={{ 
              textAlign: 'center', 
              marginBottom: '20px', 
              paddingBottom: '15px', 
              borderBottom: '3px solid #dc2626',
              background: 'rgba(220, 38, 38, 0.1)',
              borderRadius: '10px',
              padding: '20px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <span style={{ fontSize: '24px' }}>🏮</span>
                <h3 style={{ 
                  margin: 0, 
                  fontSize: '20px',
                  color: '#dc2626',
                  fontFamily: '"Trebuchet MS", sans-serif',
                  fontWeight: 'bold'
                }}>
                  China Express Restaurant
                </h3>
                <span style={{ fontSize: '24px' }}>🏮</span>
              </div>
              <p style={{ 
                margin: '5px 0', 
                fontSize: '16px', 
                color: '#7c2d12',
                fontWeight: '600'
              }}>
                🧾 Factura de Compra
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '10px' }}>
                <p style={{ 
                  margin: 0, 
                  fontSize: '13px', 
                  color: '#dc2626',
                  background: 'rgba(254, 243, 199, 0.8)',
                  padding: '5px 10px',
                  borderRadius: '15px',
                  border: '1px solid #f59e0b'
                }}>
                  📅 {new Date().toLocaleDateString('es-ES')}
                </p>
                <p style={{ 
                  margin: 0, 
                  fontSize: '13px', 
                  color: '#dc2626',
                  background: 'rgba(254, 243, 199, 0.8)',
                  padding: '5px 10px',
                  borderRadius: '15px',
                  border: '1px solid #f59e0b'
                }}>
                  🕐 {new Date().toLocaleTimeString('es-ES')}
                </p>
              </div>
            </div>

            {/* Lista de productos */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '10px', 
                marginBottom: '15px',
                padding: '10px',
                background: 'rgba(220, 38, 38, 0.1)',
                borderRadius: '8px',
                border: '2px solid #dc2626'
              }}>
                <span style={{ fontSize: '20px' }}>🥢</span>
                <h4 style={{ 
                  margin: 0, 
                  fontSize: '18px', 
                  fontWeight: '700',
                  color: '#dc2626',
                  fontFamily: '"Trebuchet MS", sans-serif'
                }}>
                  Productos Pedidos:
                </h4>
              </div>
              {allProducts.map(product => (
                <div 
                  key={product.id} 
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '15px',
                    margin: '10px 0',
                    background: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: '10px',
                    border: '2px solid #f59e0b',
                    boxShadow: '0 3px 6px rgba(0,0,0,0.1)'
                  }}
                >
                  <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ 
                      fontSize: '24px',
                      background: '#dc2626',
                      color: '#fbbf24',
                      borderRadius: '50%',
                      width: '35px',
                      height: '35px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      fontSize: '14px'
                    }}>
                      {product.quantity}
                    </span>
                    <div>
                      <p style={{ 
                        margin: '0 0 5px 0', 
                        fontWeight: '600', 
                        fontSize: '15px',
                        color: '#7c2d12'
                      }}>
                        🍜 {product.title}
                      </p>
                      <p style={{ 
                        margin: 0, 
                        fontSize: '13px', 
                        color: '#dc2626',
                        fontWeight: '500'
                      }}>
                        ${product.price} × {product.quantity} unidades
                      </p>
                    </div>
                  </div>
                  <div style={{ 
                    fontWeight: '700', 
                    fontSize: '16px',
                    color: '#dc2626',
                    background: '#fef3c7',
                    padding: '8px 12px',
                    borderRadius: '20px',
                    border: '2px solid #f59e0b'
                  }}>
                    ${(product.price * product.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            {/* Resumen de totales */}
            <div style={{ 
              background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
              padding: '20px',
              borderRadius: '15px',
              border: '3px solid #fbbf24',
              color: '#fbbf24'
            }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '10px', 
                marginBottom: '15px',
                justifyContent: 'center'
              }}>
                <span style={{ fontSize: '24px' }}>💰</span>
                <h3 style={{ 
                  margin: 0, 
                  fontSize: '20px',
                  fontFamily: '"Trebuchet MS", sans-serif',
                  color: '#fbbf24'
                }}>
                  Resumen de Pago
                </h3>
              </div>
              
              <div style={{ 
                background: 'rgba(251, 191, 36, 0.1)', 
                padding: '15px', 
                borderRadius: '10px',
                border: '1px solid #fbbf24'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span style={{ fontSize: '15px', fontWeight: '500' }}>💸 Subtotal:</span>
                  <span style={{ fontSize: '15px', fontWeight: '600' }}>${total.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span style={{ fontSize: '15px', fontWeight: '500' }}>📦 Total de artículos:</span>
                  <span style={{ fontSize: '15px', fontWeight: '600' }}>{countProducts}</span>
                </div>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  fontSize: '20px', 
                  fontWeight: 'bold', 
                  marginTop: '20px', 
                  paddingTop: '15px', 
                  borderTop: '2px solid #fbbf24',
                  background: 'rgba(251, 191, 36, 0.2)',
                  padding: '15px',
                  borderRadius: '8px'
                }}>
                  <span>🎯 TOTAL A PAGAR:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Detalle de Factura */}
      {showModalDeleteProduct && (
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
              background: 'linear-gradient(135deg, #fef3c7 0%, #fbbf24 100%)',
              padding: '30px',
              borderRadius: '15px',
              maxWidth: '500px',
              width: '90%',
              maxHeight: '80vh',
              overflowY: 'auto',
              boxShadow: '0 20px 40px rgba(220, 38, 38, 0.3)',
              border: '3px solid #dc2626'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3>¿Estás seguro de que deseas eliminar este producto?</h3>
            <div className="modal-actions">
              <button style={{
                backgroundColor: '#dc2626',
                color: '#fbbf24',
                border: '2px solid #fbbf24',
                padding: '10px 15px',
                borderRadius: '25px',
                marginTop: '10px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 'bold',
                width: '50%',
                transition: 'all 0.3s',
                fontFamily: '"Trebuchet MS", sans-serif'
              }}
                onClick={() => onDeleteProduct()}
              >
                Eliminar
              </button>
            
              <button style={{
                backgroundColor: '#dc2626',
                color: '#fbbf24',
                border: '2px solid #fbbf24',
                padding: '10px 15px',
                borderRadius: '25px',
                marginTop: '10px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 'bold',
                width: '50%',
                transition: 'all 0.3s',
                fontFamily: '"Trebuchet MS", sans-serif'
              }}
              onClick={() => setShowModalDeleteProduct(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para limpiar carrito */}
      {showModalCleanCart && (
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
          onClick={() => setShowModalCleanCart(false)}
        >
          <div
            className="modal-content"
            style={{
              background: 'linear-gradient(135deg, #fef3c7 0%, #fbbf24 100%)',
              padding: '30px',
              borderRadius: '15px',
              maxWidth: '500px',
              width: '90%',
              maxHeight: '80vh',
              overflowY: 'auto',
              boxShadow: '0 20px 40px rgba(220, 38, 38, 0.3)',
              border: '3px solid #dc2626'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3>¿Estás seguro de que deseas limpiar el carrito?</h3>
            <div className="modal-actions">
              <button style={{
                backgroundColor: '#dc2626',
                color: '#fbbf24',
                border: '2px solid #fbbf24',
                padding: '10px 15px',
                borderRadius: '25px',
                marginTop: '10px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 'bold',
                width: '50%',
                transition: 'all 0.3s',
                fontFamily: '"Trebuchet MS", sans-serif'
              }}
                onClick={() => handleCleanCart()}
              >
                Limpiar
              </button>

              <button style={{
                backgroundColor: '#dc2626',
                color: '#fbbf24',
                border: '2px solid #fbbf24',
                padding: '10px 15px',
                borderRadius: '25px',
                marginTop: '10px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 'bold',
                width: '50%',
                transition: 'all 0.3s',
                fontFamily: '"Trebuchet MS", sans-serif'
              }}
                onClick={() => setShowModalCleanCart(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
