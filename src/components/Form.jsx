export const Form = ({libroCreate, setBooks, actualizarLista}) => {


    const handleChange = (e) => {
        setBooks({
            ...libroCreate,
            [e.target.name]: e.target.value,
        });
    }

    const {titulo, autor, edicion} = libroCreate;

    

    const handleSubmit = (e) => {

        e.preventDefault();
        
        const parsedEdicion = parseInt(edicion, 10);
        //validación de los datos
        if (titulo === '' || autor === '' || parsedEdicion <= 0 ) {
            alert('Todos los campos son obligatorios')
            return
        }

        const requesInit = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(libroCreate),
        };

       

        fetch("https://back-end-2-pg-render-book.onrender.com/api", requesInit)
        .then((response) => response.json())
        .then(() => {
            alert("Libro guardado con exito");
            actualizarLista();
            window.location.reload(); 
        });

        setBooks({
            autor: '',
            titulo: '',
            edicion: 0,
        });

        
    }

    
    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="titulo" className="form-label">Titulo</label>
                <input onChange={handleChange} type="text" className="form-control" name="titulo" id="titulo" />
            </div>
            <div className="mb-3">
                <label htmlFor="autor" className="form-label">Autor</label>
                <input onChange={handleChange} type="text" className="form-control" name="autor" id="autor"/>
            </div>
            <div className="mb-3">
                <label htmlFor="edicion" className="form-label">Edicion</label>
                <input  onChange={handleChange} type="number" className="form-control" name="edicion" id="edicion" />
            </div>
            
            <button type="submit" className="btn btn-primary">Guardar</button>
        </form>
    );
};