import { Link } from "react-router-dom";

export const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link to="/" className="navbar-brand mb-0 h1">
                    📇 Mi Agenda
                </Link>
                <div className="ml-auto">
                    <Link to="/contacts" className="btn btn-primary me-2">
                        Lista de Contactos
                    </Link>

                    <Link to="/create" className="btn btn-success">
                        + Nuevo Contacto
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

