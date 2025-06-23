import { Fragment, useState, useEffect } from "react";
import { BookList } from "./components/BookList";
import { Form } from "./components/Form";
import { Navbars } from "./components/Navbars";

function App() {
  const [libros, setBooks] = useState([]); // listar libros

  const [bookCreate, setBookCreate] = useState({
    titulo: "",
    autor: "",
    edicion: 0,
  });

  const obtenerLibros = async () => {
    try {
      const response = await fetch(
        "https://mvvwbvozjthaiuinazuz.supabase.co/rest/v1/libro?select=*",
        {
          method: "GET",
          headers: {
            apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im12dndidm96anRoYWl1aW5henV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2OTQ4NDUsImV4cCI6MjA2NjI3MDg0NX0.SWJrO2E80Zfgr4QnFvjm6OiPEb5O7X-SIvj0pFEbZ_A",
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im12dndidm96anRoYWl1aW5henV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2OTQ4NDUsImV4cCI6MjA2NjI3MDg0NX0.SWJrO2E80Zfgr4QnFvjm6OiPEb5O7X-SIvj0pFEbZ_A",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al obtener los libros");
      }

      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error("Error al obtener los libros:", error);
    }
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
              <Form libroCreate={bookCreate} setBooks={setBookCreate} actualizarLibros={obtenerLibros} />
            </div>
          </div>
        </div>
      </Fragment>
    </>
  );
}

export default App;
