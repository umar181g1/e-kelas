/* eslint-disable no-mixed-operators */
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";

const RegistrasiUser = () => {
  const history = useHistory();
  const [nama, Setnama] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, SetKomfirmasi] = useState('');

  useEffect(() => {
    const login = localStorage.getItem("dataloginuser");
    if (login) {
      // history.push('/list-vidi0-admin');
    }
  }, [history]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const dataSend = {
      nama,
      email,
      password,
      password_confirmation : password_confirmation
    };
    if (
      nama === "" ||
      email === "" ||
      password === "" ||
      password_confirmation === ""
    ) {
      swal("registrasi gagal", "coba lagi");
    } else {
      fetch(`${"http://127.0.0.1:8000"}/registrasi`, {
        method: "POST",
        body: JSON.stringify(dataSend),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((hasil) => {
          console.log(hasil);
            if(hasil.status === 'berhasil'){
              localStorage.setItem('dataloginuser',hasil.token)
            history.push('/list-vidi0-admin')
            }
        })
        .catch((err) => {
          alert(err);
        });
    }
  };

  return (
    <>
      <div className="container image-bg">
        <div className="d-flex justify-content-center h-100">
          <div className="card">
            <div className="card-header">
              <h3>Registrasi User</h3>
              <div className="d-flex justify-content-end social-icon">
                <span>
                  <i className="fab fa-facebook-square"></i>
                </span>
                <span>
                  <i className="fab fa-google-plus-square"></i>
                </span>
                <span>
                  <i className="fab fa-twitter-square"></i>
                </span>
              </div>
            </div>

            <div className="card-body">
              <form>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-user"></i>
                    </span>
                  </div>
                  <input
                    value={nama}
                    onChange={(e) => Setnama(e.target.value)}
                    type="nama"
                    className="form-control"
                    placeholder="nama"
                  />
                </div>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-user"></i>
                    </span>
                  </div>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    className="form-control"
                    placeholder="email"
                  />
                </div>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-key"></i>
                    </span>
                  </div>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    className="form-control"
                    placeholder="password"
                  />
                </div>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-key"></i>
                    </span>
                  </div>
                  <input
                    value={password_confirmation}
                    onChange={(e) => SetKomfirmasi(e.target.value)}
                    type="password"
                    className="form-control"
                    placeholder=" password_confirmation"
                  />
                  {(password !== password_confirmation && (password.length > 0 ||
                  password_confirmation.length > 0 ? (
                    <span style={{ color: "red", fontSize: "15" }}>
                      Password dan komfimasi password harus sama{" "}
                    </span>
                  ) : (
                    ""
                  )))}
                </div>
                <div className="form-group">
                  <button
                    onClick={(e) => handleSubmit(e)}
                    className="btn float-right login_btn"
                  >
                    Registrasi USER
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegistrasiUser;
