/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Modal } from "react-bootstrap";
import swal from "sweetalert";

const ListUser = () => {
  const history = useHistory();
  const [dataUser, setDatauser] = useState([]);
  const [lgShow, setLgShow] = useState(false);
  const [nama, Setnama] = useState("");
  const [email, SetEmail] = useState("");
  const [password, SetPass] = useState("");
  const [show, setShow] = useState(false);
  const [idHapus, setIdhpus] = useState(0);

  const handleClose = () => {
    setShow(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("dataloginadmin");
    if (!token) {
      history.push("/login-admin");
    }

    getDataUser();
  }, []);

  const getDataUser = () => {
    const token = localStorage.getItem("dataloginadmin");
    const dataSend = {
      token,
    };
    fetch(`${"http://127.0.0.1:8000"}/listAdmin`, {
      method: "POST",
      body: JSON.stringify(dataSend),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((hasil) => {
        if (hasil.status === "berhasil") {
          console.log(hasil);
          setDatauser(hasil.data);
        } else {
          history.push("/login-admin");
        }
      });
  };
  const handleSimpan = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("dataloginadmin");
    const dataSend = {
      nama,
      email,
      password,
      token,
    };
    if (nama === "" || email === "" || password === "") {
      swal("failed", "form harus diisi", "error");
    }
    fetch(`${"http://127.0.0.1:8000"}/tambahAdmin`, {
      method: "POST",
      body: JSON.stringify(dataSend),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((hasil) => {
        console.log(hasil);
        if (hasil.status === "berhasil") {
          swal("success", "data berhasil di tambahkan", "success");
          setLgShow(false);
          clearState();
          getDataUser();
        } else {
        }
      })
      .catch((err) => {
        alert(err);
      });
  };
  const clearState = () => {
    Setnama("");
    SetEmail("");
    SetPass("");
  };

  const handleHapus = (id) => {
    setShow(true);
    setIdhpus(id);
  };
  const handleTrigerHapus = () => {
    const token = localStorage.getItem("dataloginadmin");
    const dataSend = {
      id_user: idHapus,
      token,
    };
    fetch(`${"http://127.0.0.1:8000"}/hapusAdmin`, {
      method: "POST",
      body: JSON.stringify(dataSend),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((hasil) => {
        console.log(hasil);
        if (hasil.status === "berhasil") {
          swal("berhasil", "data berhasi dihapus", "success");
          setShow(false);
          getDataUser();
        } else {
          history.push("/login-admin");
        }
      });
  };
  return (
    <>
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Tambah User
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label htmlFor="nama">Nama</label>
              <input
                onChange={(e) => Setnama(e.target.value)}
                value={nama}
                type="text"
                className="form-control"
                id="nama"
                aria-describedby="nama"
                placeholder="nama"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                onChange={(e) => SetEmail(e.target.value)}
                value={email}
                type="email"
                className="form-control"
                id="email"
                placeholder="email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input
                onChange={(e) => SetPass(e.target.value)}
                value={password}
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
              />
            </div>
            <button
              onClick={(e) => handleSimpan(e)}
              className="btn btn-primary"
            >
              Submit
            </button>
          </form>
        </Modal.Body>
      </Modal>
      {/* modal hapus admin */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Hapus Admin</Modal.Title>
        </Modal.Header>
        <Modal.Body>Apakah Anda yakin menghapus data ini</Modal.Body>
        <Modal.Footer>
          <button variant="secondary" onClick={handleClose}>
            cancel
          </button>
          <button variant="danger" onClick={handleTrigerHapus}>
            hapus
          </button>
        </Modal.Footer>
      </Modal>
      <h1 className="text-center pb-5 mb-5 mt-5">List User</h1>
      <div className="container">
        <button
          onClick={() => setLgShow(true)}
          className="mb-4 btn btn-success rounded"
        >
          + TAMBAH USER
        </button>
        <table className="table table-striped">
          <thead className="thead-dark">
            <tr>
              <th scope="col">NO</th>
              <th scope="col">Nama</th>
              <th scope="col">Email</th>
              <th scope="col">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {dataUser.map((data, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{data.nama}</td>
                  <td>{data.email}</td>
                  <td>
                    <button
                      onClick={() => handleHapus(data.id_user)}
                      className="btn btn-rounded btn-danger"
                    >
                      hapus
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ListUser;
