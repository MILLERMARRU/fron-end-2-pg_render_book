export const Navbars = ({ brand }) => {
  return (
    <>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href="#!">
            {brand}
            <i className="bi bi-person ms-2"></i>
          </a>
        </div>
      </nav>
    </>
  );
};
