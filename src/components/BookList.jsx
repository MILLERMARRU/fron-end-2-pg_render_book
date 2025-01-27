export const BookList = ({ libroCreate, book }) => {
  const { titulo, autor, edicion } = libroCreate;

  const handleDelete = (id) => {
    const requesInit = {
      method: "DELETE",
    };
    fetch(
      "https://back-end-2-pg-render-book.onrender.com/api/" + id,
      requesInit
    )
      .then((response) => response.json())
      .then(() => {
        alert("Libro eliminado con exito");
        window.location.reload();
      });
  };

  const handleUpdate = (id) => {
    const parsedEdicion = parseInt(edicion, 10);
    //validación de los datos
    if (titulo === "" || autor === "" || parsedEdicion <= 0) {
      alert("Todos los campos son obligatorios");
      return;
    }

    const requesInit = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        titulo,
        autor,
        edicion: parsedEdicion,
      }),
    };

    fetch(
      "https://back-end-2-pg-render-book.onrender.com/api/" + id,
      requesInit
    )
      .then((response) => response.text())
      .then(() => {
        alert("Libro actualizado con exito");
        window.location.reload();
      })
      .catch((error) => console.error("Error al actualizar el libro:", error));
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
                      onClick={() => {
                        handleUpdate(book.id);
                      }}
                      className="btn btn-primary"
                    >
                      <i className="bi bi-pencil"></i>
                    </button>

                    <button
                      onClick={() => {
                        handleDelete(book.id);
                      }}
                      className="btn btn-danger"
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
