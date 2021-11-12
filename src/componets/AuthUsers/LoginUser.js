import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';

const LoginUser = () => {
  const history = useHistory()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  useEffect(() => {
    const login = localStorage.getItem('dataloginuser');
    if(login){
     // history.push('/list-vidi0-admin');
    }
  },[history]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const dataSend = {
      email,
      password,
    };
    if (email === "" || password === "") {
      swal('login gagal', 'coba lagi');
    } else {
      fetch(`${'http://127.0.0.1:8000'}/LoginPeserta`, {
        method: 'POST',
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
          history.push('/listvidio-user')
          }
        })
        .catch(err =>{
          alert(err)

        })
    }
  }



  return (
    <>
      <div className="container image-bg">
        <div className="d-flex justify-content-center h-100">
          <div className="card">
            <div className="card-header">
              <h3>Login User</h3>
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
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    className="form-control"
                    placeholder="username"
                  />
                </div>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-key"></i>
                    </span>
                  </div>
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    className="form-control"
                    placeholder="password"
                  />
                </div>
                <div className="form-group">
                  <button
                    onClick={(e) => handleSubmit(e)}
                    className="btn float-right login_btn">
                    LOGIN USER
                  </button>
                </div>
                <div className="form-group">
                  <button
                    onClick={(e) => handleSubmit(e)}
                    className="btn float-right login_btn">
                    Regristasi USER
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

export default LoginUser;
