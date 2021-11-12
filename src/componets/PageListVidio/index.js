/* eslint-disable no-lone-blocks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/no-redundant-roles */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect } from "react";
import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import ReactPlayer from "react-player/lazy";
import { useHistory } from "react-router-dom";

const ListVidioUser = () => {
  const history = useHistory();
  const [datalistVidio, setDataListVidio] = useState([]);
  const [hanldeShowVidio, setHandleShowVideo] = useState(false);
  const [linkVidio, setLinkVidio] = useState("");
  // const [searchVidio, setSacrh] = useState("");

  // useEffect(() => {
  //   const token = localStorage.getItem("dataloginuser");
  //   const senData = {
  //     cari: searchVidio,
  //     token,
  //   };

  //   fetch(`${"http://127.0.0.1:8000"}/cariKontenPeserta`, {
  //     method: "POST",
  //     body: JSON.stringify(senData),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //   .then((res) => res.json())
  //   .then(hasil =>{
  //       console.log(hasil)
  //       if(hasil.status === 'gagal'){{
  //           localStorage.removeItem('dataloginuser')
  //           history.replace('/')
  //       }}
  //       setDataListVidio(hasil.data)

  //   })
  //   .catch(err =>{
  //       alert('=>>>>',err)
  //   })
  // },[searchVidio])

  const handleClose = () => {
    setHandleShowVideo(false);
  };

  useEffect(() => {
    const login = localStorage.getItem("dataloginuser");
    if (!login) {
      history.push("/login-admin");
    }

    getyData();
  }, []);
  const getyData = () => {
    const token = localStorage.getItem("dataloginuser");
    const senData = {
      token,
    };
    fetch(`${"http://127.0.0.1:8000"}/listKontenPeserta`, {
      method: "POST",
      body: JSON.stringify(senData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((hasil) => {
        console.log("data", hasil);
        if (hasil.status === "berhasil") {
          setDataListVidio(hasil.data);
        } else {
          history.push("/");
          localStorage.removeItem("dataloginuser");
        }
      })
      .catch((err) => {
        alert(err);
      });
  };
  const handleOpenVidio = (data) => {
    setHandleShowVideo(true);
    console.log(data);
    setLinkVidio(data.link_vidio);
  };

  const LOGOUT = () => {
    localStorage.removeItem("dataloginuser");
    history.push("/");
  };
  return (
    <>
      <Modal show={hanldeShowVidio} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>vidio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            <div className="h-auto">
              <>
                <ReactPlayer
                  pip={true}
                  config={{
                    youtube: {
                      playerVars: {
                        showinfo: 1,
                        origin: window.location.origin,
                      },
                    },
                  }}
                  width="100%"
                  height="300px"
                  controls={true}
                  url={`${linkVidio}`}
                />
              </>
            </div>
          }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="jumbotron">
        <h1 className="display-4">Hello, world!</h1>
        <p className="lead">
          This is a simple hero unit, a simple jumbotron-style component for
          calling extra attention to featured content or information.
        </p>
        <hr className="my-4" />
        <p>
          It uses utility classes for typography and spacing to space content
          out within the larger container.
        </p>
        <button
          onClick={() => LOGOUT()}
          className="btn btn-primary  btn-lg ml-3"
          role="button"
        >
          LOGOUT
        </button>
        <form className="form-inline">
          {/* <input
            style={{ marginLeft: "auto" }}
            onChange={(e) => setSacrh(e.target.value)}
            className="form-cotrol mr-sm-2"
            type="search"
            placeholder="search vidio"
          /> */}
        </form>
      </div>
      <div className="row justify-content-center">
        {datalistVidio
          ? datalistVidio.map((data, index) => {
              return (
                <div
                  key={index}
                  className="card m-3 col-md-4 col-lg-3"
                  style={{ width: "18rem", height: "auto", border: "none" }}
                >
                  <img
                    onClick={() => handleOpenVidio(data)}
                    src={data.link_thumbnail}
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body">
                    <h5 className="card-title">{data.judul}</h5>
                    <p className="card-text">{data.keterangan}</p>
                  </div>
                </div>
              );
            })
          : ""}
      </div>
    </>
  );
};

export default ListVidioUser;
