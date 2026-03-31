import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import contactApi from "../services/contactApi";
import useGlobalReducer from "../hooks/useGlobalReducer";
import Swal from "sweetalert2";

const EditContact = () => {
    const navigate = useNavigate();
    const { store, dispatch } = useGlobalReducer();
    const contact = store.selected;

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        address: '',
    });

    useEffect(() => {
        if (contact) {
            setFormData({
                name: contact.name || contact.full_name || '',
                phone: contact.phone || '',
                email: contact.email || '',
                address: contact.address || '',
            });
        }
    }, [contact]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!contact?.id) {
            alert("uploading contact is not correct");
            return;
        }

        try {
            // 1. Guardamos los cambios en la API
            await contactApi.editContact(contact.id, formData);

            // 2. Esperamos un momento para que la API procese el cambio
            await new Promise(resolve => setTimeout(resolve, 800));

            // 3. Recargamos la lista completa desde la API
            const freshData = await contactApi.getAgenda();

            // 4. Actualizamos el estado global
            dispatch({
                type: "updateContactsData",
                payload: { Data: freshData }
            });

            await Swal.fire({
                title: "¡Ready!",
                text: "The changes were saved successfully.",
                icon: "success",
                confirmButtonText: "OK"
            });

            // Después de presionar OK, navegamos
            navigate('/contacts');
        } catch (error) {
            console.error(error);
            alert("Error to save changes. try again.");
        }
    };

    if (!contact) {
        return <div className="text-center mt-5"><h3>Uploading contact...</h3></div>;
    }

    return (
        <div>
            <div className="container mt-5 d-flex justify-content-center">
                <div className="w-50">

                    <h1>Editar Contacto</h1>
                    <form onSubmit={handleSubmit} className="mt-4">
                        <input
                            type="text"
                            className="form-control mb-2"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Nombre"
                            required
                        />
                        <input type="text"
                            className="form-control mb-2"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Teléfono"
                        />
                        <input
                            type="email"
                            className="form-control mb-2"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                        />
                        <input type="text"
                            className="form-control mb-2"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Dirección"
                        />
                        <div className="d-flex gap-3">
                            <button type="submit" className="btn btn-primary">save changes</button>
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => navigate('/')}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div >
    );
};

export default EditContact;