import { useState, useEffect, useMemo } from "react";
import { db } from "../data/db";

const useCart = () => {
  const initialCart = () => {
    const localStorageCart = localStorage.getItem("cart");
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  };
  const [data] = useState(db);
  const [cart, setCart] = useState(initialCart);

  const MIN_ITEMS = 1;
  const MAX_ITEMS = 10;

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  /* useEffect(() => {setData(db)}, [])  Si fuera una API, mejor así, pero al ser un archivo local, vale el useState*/

  function addToCart(item) {
    const itemExists = cart.findIndex((guitar) => guitar.id === item.id); // Si el elemento no existe nos devuelve -1 y si no la posición del primer elemento con el mismo id en el array.

    if (itemExists >= 0) {
      if (cart[itemExists].quantity >= MAX_ITEMS) return;
      // existe en el carrito
      const updatedCart = [...cart];
      updatedCart[itemExists].quantity++;
      setCart(updatedCart);
    } else {
      item.quantity = 1;
      setCart([...cart, item]);
    }
  }

  function removeFromCart(id) {
    setCart((prevCart) => prevCart.filter((guitar) => guitar.id !== id));
  }

  function decreaseQuantity(id) {
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.quantity > MIN_ITEMS) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item;
    });
    setCart(updatedCart);
  }

  function increaseQuantity(id) {
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.quantity < MAX_ITEMS) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });
    setCart(updatedCart);
  }

  function clearCart(e) {
    setCart([]);
  }

  /*
  State Derivado
  const isEmpty = () => cart.length === 0;
  */

  // Usando useMemo para hacer la misma operación que antes, verificar que el carrito está vacío y calcular el total. Con useMemo, lo que hacemos es que no va a renderizar la aplicación hasta que cambie lo que le digamos. De la otra forma, cada vez que añadimos una guitarra al carrito, la aplicación va a renderizar.

  const isEmpty = useMemo(() => cart.length === 0, [cart]);

  const cartTotal = useMemo(
    () =>
      cart.reduce((total, guitar) => total + guitar.price * guitar.quantity, 0),
    [cart]
  );

  return {
    data,
    cart,
    addToCart,
    removeFromCart,
    decreaseQuantity,
    increaseQuantity,
    clearCart,
    isEmpty,
    cartTotal,
  };
};

export default useCart;
