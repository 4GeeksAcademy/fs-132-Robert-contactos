import { useState } from "react";
import contactApi from "../services/contactApi";
import { useNavigate } from "react-router-dom";

const NewContact = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        address: '',
    })

    const handleChange = e => {
        console.log(e.target.name, e.target.value)
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        contactApi.createContact(formData);
        contactApi.getAgenda()
        navigate('/')
    }

    return (
        <div>
            <div className="container mt-5 d-flex justify-content-center">
                <div className="w-50">

                    <h1>New Contact</h1>
                    <form onSubmit={handleSubmit} >
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
                        <button type="submit" className="btn btn-primary btn-lg w-100">
                            💾 Save Contact
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default NewContact;