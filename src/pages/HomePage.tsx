import { useEffect, useState } from "react"
import type { Product } from "../models/Product";
import { Category } from "../models/Category";

// renderdamine --> esmakordne componendi peale tulek
// re-renderdamine --> componendi HTMLs muutujate olekute muutmine

function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(3);
  const [sort, setSort] = useState("id,asc");
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategoryId, setActiveCategoryId] = useState(0);
  // let products = [];
  // products = json

  useEffect(() => {
    fetch(import.meta.env.VITE_BACK_URL + "/categories")
      .then(res => res.json())
      .then(json => setCategories(json)) 
  }, []);

  // uef --> enter
  // onLoad funktsioon + dependency array sees olevate muutujate muutmisel läheb käima
  // http://localhost:8080/products?page=1&size=3&sort=id,desc&activeCategoryId=0
  useEffect(() => {
    fetch(import.meta.env.VITE_BACK_URL + `/products?page=${page}&size=${size}&sort=${sort}&activeCategoryId=${activeCategoryId}`) // URL kuhu läheb päring
      .then(res => res.json()) // kogu tagastus
      .then(json => {
        setProducts(json.content);
        setTotalElements(json.totalElements);
        setTotalPages(json.totalPages);
      }) // response-i body
  }, [page, size, sort, activeCategoryId]);

  // function sizeHandler() {

  // }
  const sizeHandler = (newSize: number) => {
    setSize(newSize);
    setPage(0);
  }

  const sortHandler = (newSort: string) => {
    setSort(newSort);
    setPage(0);
  }

  const activeCategoryHandler = (categoryId: number) => {
    setActiveCategoryId(categoryId);
    setPage(0);
  }

  // tõlge: https://react.i18next.com/guides/quick-start
  return (
    <div>
      <div>
        {page*size+1}-{(page+1)*size > totalElements ? totalElements : (page+1)*size} 
        kuvatud {totalElements}-st
      </div>

      <select defaultValue={3} onChange={(e) => sizeHandler(Number(e.target.value))}>
        <option>2</option>
        <option>3</option>
        <option>4</option>
      </select>

      <br /><br />

      <button onClick={() => sortHandler("id,asc")}>Sorteeri vanemad enne</button>
      <button onClick={() => sortHandler("id,desc")}>Sorteeri uuemad enne</button>
      <button onClick={() => sortHandler("name,asc")}>Sorteeri A-Z</button>
      <button onClick={() => sortHandler("name,desc")}>Sorteeri Z-A</button>
      <button onClick={() => sortHandler("price,asc")}>Sorteeri hind kasvavalt</button>
      <button onClick={() => sortHandler("price,desc")}>Sorteeri hind kahanevalt</button>

      <br /><br />

      <button
          style={activeCategoryId === 0 ? {fontWeight: "bold"}: undefined} 
          onClick={() => activeCategoryHandler(0)}
      >
        Kõik kategooriad
      </button>
      {categories.map(category => 
        <button 
          style={activeCategoryId === category.id ? {fontWeight: "bold"}: undefined} 
          onClick={() => activeCategoryHandler(Number(category.id))}>
          {category.name}
        </button>
      )}

      <br /><br />

      {products.map(product => 
        <div key={product.id}>
          {product.name} - {product.price}€
        </div>)}

      <button disabled={page === 0} onClick={() => setPage(page - 1)}>Eelmine</button>
      <span>{page+1} / {totalPages}</span>
      <button disabled={page+1 === totalPages} onClick={() => setPage(page + 1)}>Järgmine</button>
    </div>
  )
}

export default HomePage