import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const title = "TP App";

function App() {
  const [users, setUsers] = useState([]);
  // form
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  // new
  // const prevId = users.length + 1
  const [newUser, setNewUser] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newTel, setNewTel] = useState("");
  const [newId, setEditNewId] = useState("");
  // edit
  const [editUser, setEditUser] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editTel, setEditTel] = useState("");

  useEffect(() => {
    fetch("https://623d08d37efb5abea689dd60.mockapi.io/users")
      .then((response) => response.json())
      .then((result) => setUsers(result))
      .catch((error) => console.log("error", error));
  }, []);

  const handleDelete = (id) => {
    var requestOptions = {
      method: "DELETE",
    };

    fetch(
      "https://623d08d37efb5abea689dd60.mockapi.io/users/" + id,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        const resultat = users.filter((user) => user.id != id);
        setUsers(resultat);
      })
      .catch((error) => console.log("error", error));
  };

  function handleChangeNom(event) {
    setNewUser(event.currentTarget.value);
    // console.log(event.currentTarget.value)
  }
  const handleChangeEmail = (event) => {
    setNewEmail(event.currentTarget.value);
    // console.log(event.currentTarget.value)
  };
  const handleChangeTel = (event) => {
    setNewTel(event.currentTarget.value);
    // console.log(event.currentTarget.value)
  };

  const handleUpdateNom = (event) => {
    setEditUser(event.currentTarget.value);
    // console.log(event.currentTarget.value)
  };
  const handleUpdateEmail = (event) => {
    setEditEmail(event.currentTarget.value);
    // console.log(event.currentTarget.value)
  };
  const handleUpdapteTel = (event) => {
    setEditTel(event.currentTarget.value);
    // console.log(event.currentTarget.value)
  };

  const handleAdd = (event) => {
    event.preventDefault();
    const newItem = {
      // id: Math.random(),
      // // id: prevId,
      nom: newUser,
      email: newEmail,
      tel: newTel,
    };

    var requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: newItem,
    };

    fetch("https://623d08d37efb5abea689dd60.mockapi.io/users", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setUsers([...users, result]);
        setNewUser("");
        setNewEmail("");
        setNewTel("");

        console.log(result);
      })
      .catch((error) => console.log("error", error));
  };

  const handleEdit = (user) => {
    setShowEditForm(true);
    setEditNewId(user.id);
    setEditUser(user.nom);
    setEditEmail(user.email);
    setEditTel(user.tel);
    // console.log(user)
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    const updatedItem = {
      id: newId,
      nom: editUser,
      email: editEmail,
      tel: editTel,
    };
    const index = users.findIndex((users) => users.id === newId);

    var urlencoded = new URLSearchParams();
    urlencoded.append("nom", editUser);
    urlencoded.append("email", editEmail);
    urlencoded.append("tel", editTel);

    var requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: urlencoded,
    };

    fetch(
      "https://623d08d37efb5abea689dd60.mockapi.io/users/" + newId,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        const usersIndex = [...users];
        usersIndex[index] = updatedItem;
        setUsers(usersIndex);
      })

      .catch((error) => console.log("error", error));

    console.log(urlencoded);
  };

  return (
    <div className="App">
      <div className="container-fluid border2">
        <div className="row">
          <div className="col-12 border py-2">
            <h1>{title}</h1>
          </div>
          <div className="col-12 py-2">
            <h2 className="">
              Liste des utilisateurs : {""}
              <span
                className="btn btn-primary"
                onClick={() => setShowForm(true)}
              >
                Ajouter un nouvel utilisateur
              </span>
            </h2>
          </div>
        </div>
        <div className="container">
          <div className="row upTable">
            <div className="col border">#</div>
            <div className="col border">Noms :</div>
            <div className="col border">Emails :</div>
            <div className="col border">Téléphones :</div>
            <div className="col border">Actions :</div>
          </div>
          {users.map((item) => (
            <div className="row" key={item.id}>
              <div className="col border">{item.id}</div>
              <div className="col border">{item.nom}</div>
              <div className="col border">{item.email}</div>
              <div className="col border">{item.tel}</div>
              <div className="col border">
                <button
                  className="btn btn-warning"
                  onClick={() => handleEdit(item)}
                >
                  <i className="fa-solid fa-pen-to-square"></i>
                </button>{" "}
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(item.id)}
                  value={item.id}
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
          ))}{" "}
          <div className="row">
            <div className="col">
              <div className="container">
                <div className="row">
                  {showForm && (
                    <div className="col py-3">
                      {/* ajouter */}
                      <div>
                        <h3>Ajouter un utilisateur :</h3>

                        <form onSubmit={handleAdd}>
                          <input
                            required
                            className="mt-1"
                            type="text"
                            placeholder="Nom :"
                            value={newUser}
                            onChange={handleChangeNom}
                          />
                          <br />
                          <input
                            type="email"
                            required
                            className="mt-1"
                            placeholder="Email :"
                            value={newEmail}
                            onChange={handleChangeEmail}
                          />{" "}
                          <input
                            required
                            className="mt-1"
                            type="number"
                            placeholder="Téléphones :"
                            value={newTel}
                            onChange={handleChangeTel}
                          />
                          <br />
                          <button
                            type="submit"
                            className="btn btn-primary mt-2 mr-2"
                          >
                            Valider
                          </button>{" "}
                          <button
                            className="btn btn-danger x_close mt-2"
                            onClick={() => setShowForm(false)}
                          >
                            Annuler
                          </button>
                        </form>
                      </div>
                    </div>
                  )}
                  {showEditForm && (
                    <div className="col py-3">
                      {/* modifier */}
                      <h3>Modifier un utilisateurs :</h3>
                      <form onSubmit={handleUpdate}>
                        <input
                          required
                          className="mt-1"
                          type="text"
                          placeholder="Nom :"
                          value={editUser}
                          onChange={handleUpdateNom}
                        />
                        <br />
                        <input
                          type="email"
                          required
                          className="mt-1"
                          placeholder="Email :"
                          value={editEmail}
                          onChange={handleUpdateEmail}
                        />{" "}
                        <input
                          required
                          className="mt-1"
                          type="number"
                          placeholder="Téléphones :"
                          value={editTel}
                          onChange={handleUpdapteTel}
                        />
                        <br />
                        <button type="submit" className="btn btn-primary mt-2">
                          Valider
                        </button>{" "}
                        <button
                          className="btn btn-danger x_close mt-2"
                          onClick={() => setShowEditForm(false)}
                        >
                          Annuler
                        </button>
                      </form>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
