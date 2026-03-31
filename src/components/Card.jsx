import { useNavigate } from "react-router-dom"
import useGlobalReducer from "../hooks/useGlobalReducer";
import contactApi from "../services/contactApi";
import { getImage } from "../utils/utilsContactList";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Card = ({ name, phone, email, address, contid, onDelete }) => {

    const navigate = useNavigate();
    const { store, dispatch } = useGlobalReducer()

    const [img, setImg] = useState('')

    useEffect(() => {
        setImg(getImage())
    }, [])

    const handleEdit = () => {
        dispatch({
            type: 'selectedContact',
            payload: {
                id: contid
            }
        });
        navigate('/edit')
    };

    const handleDelete = async () => {
        Swal.fire({
            title: "Alert",
            text: "Are you sure for delete this contact?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "No"
        }).then((res) => {
            if (res.isConfirmed) {
                contactApi.deleteContact(contid).then(resp => {
                    if (resp == true) {
                        onDelete();
                    }
                })
            }
        })

    };

    return (
        <div className="col-md-4 mb-3">
            <div className="card h-100">
                <div className="card-body">
                    <img src={img} className="avatar" />
                    <h5 className="card-title">{name || "No name"}</h5>
                    <p className="card-text"><strong>Tel:</strong> {phone}</p>
                    {email && <p><strong>Email:</strong> {email}</p>}
                    {address && <p><strong>Dirección:</strong> {address}</p>}
                </div>
                <div className="card-footer d-flex gap-2">
                    <button className="btn btn-success flex-fill" onClick={handleEdit}>
                        ✏️ Edit
                    </button>
                    <button className="btn btn-danger flex-fill" onClick={handleDelete}>
                        🗑 Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Card