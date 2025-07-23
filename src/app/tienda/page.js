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
    const userData = localStorage.getItem('user');
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
    localStorage.removeItem('user');
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
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f3f4f6'
      }}>
        <p>Cargando...</p>
      </div>
    );
  }

  // Si no hay usuario, no mostrar nada (se redirigirá)
  if (!user) {
    return null;
  }

  return (
    <>
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
    </>
  );
}
