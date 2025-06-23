import Swal from "sweetalert2";

export const Form = ({ libroCreate, setBooks, actualizarLibros }) => {
  const handleChange = (e) => {
    setBooks({
      ...libroCreate,
      [e.target.name]: e.target.value,
    });
  };

  const { titulo, autor, edicion } = libroCreate;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const parsedEdicion = parseInt(edicion, 10);

    if (titulo === "" || autor === "" || parsedEdicion <= 0) {
      Swal.fire("Error", "Por favor llene todos los campos", "warning");
      return;
    }

    const nuevoLibro = {
      titulo,
      autor,
      edicion: parsedEdicion,
    };

    try {
      const response = await fetch(
        "https://mvvwbvozjthaiuinazuz.supabase.co/rest/v1/libro",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im12dndidm96anRoYWl1aW5henV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2OTQ4NDUsImV4cCI6MjA2NjI3MDg0NX0.SWJrO2E80Zfgr4QnFvjm6OiPEb5O7X-SIvj0pFEbZ_A",
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im12dndidm96anRoYWl1aW5henV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2OTQ4NDUsImV4cCI6MjA2NjI3MDg0NX0.SWJrO2E80Zfgr4QnFvjm6OiPEb5O7X-SIvj0pFEbZ_A",
            Prefer: "return=minimal",
          },
          body: JSON.stringify(nuevoLibro),
        }
      );

      if (!response.ok) {
        throw new Error("Error al insertar el libro");
      }


      Swal.fire({
        title: "¡Éxito!",
        text: "El libro ha sido guardado correctamente.",
        icon: "success",
        timer: 3000,
        showConfirmButton: false,
      });

      actualizarLibros();

      // Limpia el formulario
      setBooks({
        autor: "",
        titulo: "",
        edicion: 0,
      });
    } catch (error) {
      Swal.fire("Error", "Hubo un problema al insertar el libro.", "error");
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="container mt-4 p-4 bg-light shadow rounded"
    >
      <div className="mb-2">
        <label htmlFor="titulo" className="form-label">
          Titulo
        </label>
        <input
          value={titulo}
          onChange={handleChange}
          type="text"
          className="form-control"
          name="titulo"
          id="titulo"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="autor" className="form-label">
          Autor
        </label>
        <input
          value={autor}
          onChange={handleChange}
          type="text"
          className="form-control"
          name="autor"
          id="autor"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="edicion" className="form-label">
          Edicion
        </label>
        <input
          value={edicion}
          onChange={handleChange}
          type="number"
          className="form-control"
          name="edicion"
          id="edicion"
        />
      </div>

      <div className="d-flex justify-content-end">
        <button type="submit" className="btn btn-success custom-hover">
          Guardar
        </button>
      </div>
    </form>
  );
};
