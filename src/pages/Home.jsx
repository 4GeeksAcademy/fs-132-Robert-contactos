import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useEffect, useState } from "react";
import contactApi from "../services/contactApi.js";
import { getImage } from "../utils/utilsContactList.js";
import Swal from "sweetalert2";

export const Home = () => {

	const { store, dispatch } = useGlobalReducer()
	const [img, setImg] = useState('')

	useEffect(() => {
		setImg(getImage())
	}, [])

	// store --> estado global (variables globales dentro de un objeto)
	// dispatch --> modificador del estado global (funciones dentro de un switch)
	const loadContacts = async () => {
		const data = await contactApi.getAgenda();
		dispatch({
			type: "updateContactsData",
			payload: { Data: data }
		});
	};

	useEffect(() => {
		loadContacts();
	}, []);

	// ultimo contacto agregado
	const lastContact = store.contactsData?.contacts?.length > 0
		? [...store.contactsData.contacts].sort((a, b) => b.id - a.id)[0]
		: null;
	const handleDelete = (id, name) => {
		Swal.fire({
			title: "Alert",
			text: ` Are you sure for delete this ${name}?`,
			icon: "warning",
			showCancelButton: true,
			confirmButtonText: "Yes",
			cancelButtonText: "No"
		}).then(async (res) => {
			if (res.isConfirmed) {
				const resp = await contactApi.deleteContact(id);
				if (resp === true) {
					loadContacts();
				}
			}
		});
	};
	return (
		<div className="container mt-5">
			<div className="text-center mb-5">
				<h1 className="display-4 fw-bold text-dark">Last Contact Added</h1>
				<p className="lead text-muted">Here is the most recently added contact</p>
			</div>

			{lastContact ? (
				<div className="row justify-content-center">
					<div className="col-lg-8 col-md-10">
						<div className="card shadow-lg border-0 overflow-hidden">
							<div className="card-body p-5">
								<div className="d-flex align-items-center gap-5">
									{/* Avatar*/}
									<img className="avatar" src={img} />

									{/* Información del contacto */}
									<div className="flex-grow-1">
										<h2 className="fw-bold mb-4">
											{lastContact.full_name || lastContact.name || "Need Name "}
										</h2>

										<div className="fs-5">
											<p className="mb-3">
												<strong>📞 Phone:</strong> {lastContact.phone || "no register yet"}
											</p>
											{lastContact.email && (
												<p className="mb-3">
													<strong>✉️ Email:</strong> {lastContact.email}
												</p>
											)}
											{lastContact.address && (
												<p className="mb-0">
													<strong>📍 Address:</strong> {lastContact.address}
												</p>
											)}
										</div>

										{/* Botones de acción */}
										<div className="d-flex gap-3 mt-5">
											<Link
												to="/edit"
												state={{ id: lastContact.id }}
												className="btn btn-success btn-lg px-4"
											>
												✏️ Edit
											</Link>
											<button
												className="btn btn-danger btn-lg px-4"
												onClick={() =>
													handleDelete(
														lastContact.id,
														lastContact.full_name || lastContact.name
													)
												}
											>
												🗑 Delete
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			) : (
				<div className="row justify-content-center">
					<div className="col-md-8">
						<div className="alert alert-info text-center py-5 shadow-sm">
							<h3>No contacts yet</h3>
							<Link to="/create" className="btn btn-primary btn-lg mt-4">
								Create First Contact
							</Link>
						</div>
					</div>
				</div>
			)
			}
		</div >

	);
}; 