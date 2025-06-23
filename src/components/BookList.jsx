import Swal from "sweetalert2";

// Configuración Supabase
const SUPABASE_URL = "https://mvvwbvozjthaiuinazuz.supabase.co/rest/v1/libro";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im12dndidm96anRoYWl1aW5henV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2OTQ4NDUsImV4cCI6MjA2NjI3MDg0NX0.SWJrO2E80Zfgr4QnFvjm6OiPEb5O7X-SIvj0pFEbZ_A"; // Pega tu anon key completa

export const BookList = ({ libroCreate, book }) => {
  const { titulo, autor, edicion } = libroCreate;

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${SUPABASE_URL}?id=eq.${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          Prefer: "return=minimal",
        },
      });

      if (!response.ok) {
        throw new Error("Error al eliminar el libro");
      }

      Swal.fire({
        title: "Eliminado",
        text: "El libro ha sido eliminado exitosamente.",
        icon: "success",
        timer: 3000,
        showConfirmButton: false,
      });

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };

  const handleUpdate = async (id) => {
    const parsedEdicion = parseInt(edicion, 10);
    if (titulo === "" || autor === "" || parsedEdicion <= 0) {
      Swal.fire("Error", "Por favor llene todos los campos", "warning");
      return;
    }

    try {
      const response = await fetch(`${SUPABASE_URL}?id=eq.${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          Prefer: "return=minimal",
        },
        body: JSON.stringify({
          titulo,
          autor,
          edicion: parsedEdicion,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar el libro");
      }

      Swal.fire({
        title: "Actualizado",
        text: "El libro ha sido actualizado correctamente.",
        icon: "success",
        timer: 3000,
        showConfirmButton: false,
      });

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      Swal.fire("Error", "No se pudo actualizar el libro.", "error");
      console.error("Error al actualizar:", error);
    }
  };

  return (
    <>
      <div className="table-responsive">
        <table className="table table-striped table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>Id</th>
              <th>Titulo</th>
              <th>Autor</th>
              <th>Edicion</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {book.map((book) => (
              <tr key={book.id}>
                <td>{book.id}</td>
                <td>{book.titulo}</td>
                <td>{book.autor}</td>
                <td>{book.edicion}</td>
                <td className="text-center align-middle">
                  <div className="d-flex justify-content-center gap-2">
                    <button
                      onClick={() => handleUpdate(book.id)}
                      className="btn btn-primary btn-decor-edit"
                    >
                      <i className="bi bi-pencil"></i>
                    </button>
                    <button
                      onClick={() => handleDelete(book.id)}
                      className="btn btn-danger btn-decor"
                    >
                      <i className="bi bi-trash3"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
