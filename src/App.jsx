import { Fragment, useState, useEffect } from "react";


import { BookList } from "./components/BookList";
import { Form } from "./components/Form";
import { Navbars } from "./components/Navbars";

function App() {
  const [libros, setBooks] = useState([]); //listar libros

  const [bookCreate, setBookCreate] = useState({
    //crear libros
    titulo: "",
    autor: "",
    edicion: 0,
  });

  const obtenerLibros = () => {
    fetch("https://back-end-2-pg-render-book.onrender.com/api")
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error("Error al obtener los libros:", error));
  };

  useEffect(() => {
    obtenerLibros();
  }, []);

  return (
    <>
      <Fragment>

        <Navbars brand="Marru Mar" />

        <div className="container mt-4">
          <div className="row g-4">

            <div className="col-lg-7 col-md-6 col-12">
              <h2 className="text-center mb-4 mt-5">Lista de Libros</h2>
              <BookList libroCreate={bookCreate} book={libros} />
            </div>

            <div className="col-lg-5 col-md-6 col-12">
              <h2 className="text-center mb-4 mt-4">Formulario de Libros</h2>
              <Form libroCreate={bookCreate} setBooks={setBookCreate} />
            </div>

          </div>
        </div>
      </Fragment>
    </>
  );
}

export default App;
