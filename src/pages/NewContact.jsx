import { useState } from "react";
import  contactApi  from "../services/contactApi";
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
            <h1>New Contact</h1>
            <form onSubmit={handleSubmit} >
                <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} />
                <input type="text" className="form-control" name="phone" value={formData.phone} onChange={handleChange} />
                <input type="text" className="form-control" name="email" value={formData.email} onChange={handleChange} />
                <input type="text" className="form-control" name="address" value={formData.address} onChange={handleChange} />
                <input type="submit" />
            </form>
        </div>
    )
}

export default NewContact;