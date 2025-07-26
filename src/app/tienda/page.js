"use client";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { Header } from "@/components/Header";
import { ProductList } from "@/components/ProductList";

export default function Tienda() {
  const [allProducts, setAllProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [countProducts, setCountProducts] = useState(0);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Verificar si el usuario está autenticado
    const userData = sessionStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      if (parsedUser.isAuthenticated) {
        setUser(parsedUser);
      } else {
        router.push('/');
      }
    } else {
      router.push('/');
    }
    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    setUser(null);
    // Limpiar carrito al cerrar sesión
    setAllProducts([]);
    setTotal(0);
    setCountProducts(0);
    router.push('/');
  };

  // Mostrar loading mientras verifica autenticación
  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #fef3c7 0%, #fed7aa 50%, #fbbf24 100%)',
        fontFamily: '"Trebuchet MS", sans-serif'
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.9)',
          padding: '40px',
          borderRadius: '20px',
          border: '3px solid #dc2626',
          boxShadow: '0 10px 25px rgba(220, 38, 38, 0.3)',
          textAlign: 'center'
        }}>
          <div style={{ 
            fontSize: '48px', 
            marginBottom: '20px',
            animation: 'bounce 2s infinite'
          }}>🏮</div>
          <p style={{
            margin: 0,
            fontSize: '18px',
            color: '#dc2626',
            fontWeight: '600'
          }}>
            Cargando China Express...
          </p>
          <p style={{
            margin: '10px 0 0 0',
            fontSize: '14px',
            color: '#7c2d12'
          }}>
            正在加载 (Zhèngzài jiàzài)
          </p>
        </div>
        
        <style jsx>{`
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {
              transform: translateY(0);
            }
            40% {
              transform: translateY(-30px);
            }
            60% {
              transform: translateY(-15px);
            }
          }
        `}</style>
      </div>
    );
  }

  // Si no hay usuario, no mostrar nada (se redirigirá)
  if (!user) {
    return null;
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #fef3c7 0%, #fed7aa 50%, #fbbf24 100%)',
      backgroundImage: `
        radial-gradient(circle at 20% 80%, rgba(220, 38, 38, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(245, 158, 11, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 40% 40%, rgba(220, 38, 38, 0.05) 0%, transparent 50%)
      `,
      position: 'relative'
    }}>  
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Header
          allProducts={allProducts}
          setAllProducts={setAllProducts}
          total={total}
          setTotal={setTotal}
          countProducts={countProducts}
          setCountProducts={setCountProducts}
          user={user}
          onLogout={handleLogout}
        />
        <ProductList
          allProducts={allProducts}
          setAllProducts={setAllProducts}
          total={total}
          setTotal={setTotal}
          countProducts={countProducts}
          setCountProducts={setCountProducts}
        />
      </div>
      
      {/* CSS para animaciones */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </div>
  );
}
