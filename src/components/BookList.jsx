export const BookList = ({ book }) => {
  return (
    <>
      <table className="table table-striped">
        <thead>
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
              <td>
                <button className="btn btn-primary">Edit</button>
                <button className="btn btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
