import { Fragment, useState, useEffect } from "react";
import  { Navbar}  from "./components/navbar";
import { BookList } from "./components/BookList";
import { Form } from "./components/form";



function App() {
  

  const [libros, setBooks] = useState([]); //listar libros

  const [bookCreate, setBookCreate] = useState({  //crear libros
    titulo: '',
    autor: '',
    edicion: 0,
  });

  const API_URL = import.meta.env.VITE_API_URL;


  const obtenerLibros = () => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error("Error al obtener los libros:", error));
  };

  useEffect(() => {
    obtenerLibros();
  }, [])
  

  return (
    <>
      <Fragment>
        <Navbar brand={"Marru"} />
        <div className="container">
          <div className="row">

            <div className="col-7">
              <h2 style={{textAlign:"center"}}>Lista de Libros</h2>
              <BookList book={libros}/>
            </div>

            <div className="col-5">
            <h2 style={{textAlign:"center"}}>Formulario de ibros</h2>
            <Form libroCreate={bookCreate} setBooks={setBookCreate} actualizarLista={obtenerLibros}/>
            </div>
          </div>
        </div>
      </Fragment>
    </>
  );
}

export default App;
