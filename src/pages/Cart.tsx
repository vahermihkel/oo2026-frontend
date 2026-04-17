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
    const cart = [...orderRows];
    cart[index].quantity--;
    if (cart[index].quantity === 0) {
      cart.splice(index,1);
    }
    setOrderRows(cart); // HTML uuenduseks
    localStorage.setItem("cart", JSON.stringify(cart)); // LS update-miseks
  }

  const increaseQuantity = (index: number) => {
    const cart = [...orderRows];
    cart[index].quantity++;
    setOrderRows(cart);
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  const emptyCart = () => {
    setOrderRows([]);
    //localStorage.set("cart", JSON.stringify([])); // localStorage.set on vale!!!
    localStorage.setItem("cart", "[]");
  }

  // if (false && true)

  const calculateTotal = () => {
    let sum = 0;
    orderRows.forEach(orderRow => sum = sum + orderRow.product.price * orderRow.quantity);
    return sum;
  }

  const makeOrder = () => {
    const payload = orderRows.map(orderRow => ({productId: orderRow.product.id, quantity: orderRow.quantity}));

    fetch(import.meta.env.VITE_BACK_URL + "/orders?personId=1", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
        //"Authorization": "Bearer " + sessionStorage.getItem("token")
        // jwt.io: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30
      }
    }).then(res => res.json())
      .then(json => alert("Lisasid edukalt tellimuse ID-ga: " + json.id)) // toastify: https://www.npmjs.com/package/react-toastify
      // react-hot-toast: https://react-hot-toast.com/
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

      {orderRows.length > 0 && 
        <>
          <div>Kokku: {calculateTotal()}</div>
          <button onClick={() => makeOrder()}>Telli</button>
          <select>
            <option>Pakiautomaat 1</option>
            <option>Pakiautomaat 2</option>
          </select>
        </> }

    </div>
  )
}

export default Cart

// Tühjenda funktsioon++
// Ütle kui ostukorv tühi on++
// Ostukorvi kogusumma arvutamine++
// Backendi uue tellimuse saatmine++

// Signup --> isiku lisamine + aadressi
// Login, aga tokenit ei hakka väljastama

// ProductDetails
// EditProduct