import { useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import contactApi from "../services/contactApi";
import Card from "../components/Card";   // Ajusta la ruta según tu estructura

export const ContactList = () => {
    const { store, dispatch } = useGlobalReducer();

    const loadContacts = useCallback(async () => {
  
        try {
            const data = await contactApi.getAgenda();
          
            dispatch({
                type: "updateContactsData",
                payload: { Data:data }
            });
        } catch (error) {
            console.error("Error uploading contacts:", error);
        }
    }, [dispatch]);
    
    // Cargar contactos cuando se monta la página
    useEffect(() => {
        loadContacts();
    }, [loadContacts]);

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Lista de Contactos</h1>
            </div>

            {store.contactsData?.contacts && store.contactsData.contacts.length > 0 ? (
                <div className="row g-3">
                    {store.contactsData.contacts.map((contact) => (
                        <Card
                            key={contact.id}
                            contid={contact.id}
                            name={contact.full_name || contact.name}
                            phone={contact.phone}
                            email={contact.email}
                            address={contact.address}
                            onDelete={loadContacts}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-5">
                    <h3>No hay contactos registrados aún</h3>
                    <Link to="/create" className="btn btn-success mt-3">
                        Crear primer contacto
                    </Link>
                </div>
            )}
        </div>
    );
};

export default ContactList;