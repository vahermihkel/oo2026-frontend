import { useState } from 'react'
import { OrderRow } from '../models/OrderRow';

function Cart() {
  const [orderRows, setOrderRows] = useState<OrderRow[]>(JSON.parse(localStorage.getItem("cart") || "[]"));

  const deleteFromCart = (index: number) => {
    orderRows.splice(index,1); // <--- kustutamiseks. esimene nr on mitmendat. teine nr on mitu tk alates sellest
    setOrderRows([...orderRows]); //setOrderRow --> HTMLi uuendamiseks. [...] mälukoha kustutamiseks
    // setOrderRow(orderRows.slice());
  }

  return (
    <div>
      {orderRows.map((orderRow, index) =>
        <div key={orderRow.product.id}>
          <div>{orderRow.product.name}</div>
          <div>{orderRow.product.price} €</div>
          <div>{orderRow.quantity} tk</div>
          <div>{orderRow.product.price * orderRow.quantity} €</div>
          <button onClick={() => deleteFromCart(index)}>X</button>
        </div>
      )}
    </div>
  )
}

export default Cart