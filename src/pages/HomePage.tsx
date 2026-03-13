import { useEffect, useState } from "react"

// renderdamine --> esmakordne componendi peale tulek
// re-renderdamine --> componendi HTMLs muutujate olekute muutmine

function HomePage() {
  const [products, setProducts] = useState([]);
  // let products = [];
  // products = json

  // uef --> enter
  // onLoad funktsioon
  useEffect(() => {
    fetch("http://localhost:8080/products") // URL kuhu läheb päring
      .then(res => res.json()) // kogu tagastus
      .then(json => setProducts(json)) // response-i body
  }, []);

  return (
    <div>
      {products.map(product => <div>{product.name} - {product.price}€</div>)}
    </div>
  )
}

export default HomePage