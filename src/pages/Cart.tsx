import { useState } from 'react'
import { OrderRow } from '../models/OrderRow';

function Cart() {
  const [orderRows, setOrderRows] = useState<OrderRow[]>(JSON.parse(localStorage.getItem("cart") || "[]"));

  const deleteFromCart = (index: number) => {
    orderRows.splice(index,1); // <--- kustutamiseks. esimene nr on mitmendat. teine nr on mitu tk alates sellest
    setOrderRows([...orderRows]); //setOrderRow --> HTMLi uuendamiseks. [...] mälukoha kustutamiseks
    // setOrderRow(orderRows.slice());
    localStorage.setItem("cart", JSON.stringify(orderRows));
  }

  const decreaseQuantity = (index: number) => {
    orderRows[index].quantity--;
    if (orderRows[index].quantity === 0) {
      orderRows.splice(index,1);
    }
    setOrderRows([...orderRows]); // HTML uuenduseks
    localStorage.setItem("cart", JSON.stringify(orderRows)); // LS update-miseks
  }

  const increaseQuantity = (index: number) => {
    orderRows[index].quantity++;
    setOrderRows([...orderRows]);
    localStorage.setItem("cart", JSON.stringify(orderRows));
  }

  const emptyCart = () => {
    setOrderRows([]);
    //localStorage.set("cart", JSON.stringify([])); // localStorage.set on vale!!!
    localStorage.setItem("cart", "[]");
  }

  // if (false && true)

  const calculateTotal = () => {
    return 100;
  }

  return (
    <div>
      {orderRows.length > 0 && <button onClick={() => emptyCart()}>Tühjenda</button>}

      {orderRows.length === 0 && <div>Ostukorv on tühi</div>}

      {orderRows.map((orderRow, index) =>
        <div key={orderRow.product.id}>
          <div>{orderRow.product.name}</div>
          <div>{orderRow.product.price} €</div>
          <button onClick={() => decreaseQuantity(index)}>-</button>
          <div>{orderRow.quantity} tk</div>
          <button onClick={() => increaseQuantity(index)}>+</button>
          <div>{orderRow.product.price * orderRow.quantity} €</div>
          <button onClick={() => deleteFromCart(index)}>X</button>
        </div>
      )}

      {orderRows.length > 0 && <div>{calculateTotal()}</div> }
    </div>
  )
}

export default Cart

// Tühjenda funktsioon
// Ütle kui ostukorv tühi on
// Ostukorvi kogusumma arvutamine
// Backendi uue tellimuse saatmine

// Signup --> isiku lisamine + aadressi
// Login, aga tokenit ei hakka väljastama

// ProductDetails
// EditProduct