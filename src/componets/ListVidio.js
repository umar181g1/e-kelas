/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/no-redundant-roles */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect } from "react";
import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import ReactPlayer from "react-player/lazy";
import { useHistory, Link } from "react-router-dom";
import swal from "sweetalert";


const ListVidioAdmin = () => {
  const history = useHistory();
  const [datalistVidio, setDataListVidio] = useState([]);
  const [hanldeShowVidio, setHandleShowVideo] = useState(false);
  const [linkVidio, setLinkVidio] = useState("");
  const [lgShow, setLgShow] = useState(false);
  const [judul, setJudul] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [link_thumbnail, setLinkThumbnail] = useState("");
  const [link_vidio, setLinkVideo] = useState("");
  const [show, setShowDelete] = useState(false);
  const [idDel, setIDel] = useState("");
  const [showEditvidio, setShowEdit] = useState("");
  const[idUpadte, setIdUpadate] = useState("");

  const handleClose = () => {
    setHandleShowVideo(false);
    setShowDelete(false);
  };

  const handleShow = (id) => {
    setShowDelete(true);
    setIDel(id);
  };

  console.log(idDel);

  useEffect(() => {
    const login = localStorage.getItem("dataloginadmin");
    if (!login) {
      history.push("/login-admin");
    }

    getyData();
  }, []);
  const getyData = () => {
    const token = localStorage.getItem("dataloginadmin");
    const senData = {
      token,
    };
    fetch(`${"http://127.0.0.1:8000"}/listKonten`, {
      method: "POST",
      body: JSON.stringify(senData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((hasil) => {
        console.log("data", hasil);
        if(hasil.status === 'berhasil'){
          setDataListVidio(hasil.data)
        }else{
          history.push('/login-admin');
          localStorage.removeItem("dataloginadmin")
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
  const handleSimpan = (e) => {
    const token = localStorage.getItem("dataloginadmin");
    const dataSend = {
      judul: judul,
      keterangan: keterangan,
      link_thumbnail: link_thumbnail,
      link_vidio: link_vidio,
      token: token,
    };
    if (
      judul === "" ||
      keterangan === "" ||
      link_thumbnail === "" ||
      link_vidio === ""
    ) {
      swal("gagal", "from harus diisi", "erorr");
      return;
    }
    e.preventDefault();
    fetch(`${"http://127.0.0.1:8000"}/tambahKonten`, {
      method: "POST",
      body: JSON.stringify(dataSend),
      headers: {
        "Content-Type": "applicatiom/json",
      },
    })
      .then((res) => res.json())
      .then((hasil) => {
        console.log("hasil", hasil);
        setLgShow(false);
        if (hasil.status === "berhasil") {
          clearState();
          swal("suksess", hasil.message, "suksess");
          getyData();
        } else {
          swal("failed", hasil.message.judul[0], "gagal");
        }
      });
  };
  const clearState = () => {
    setJudul("");
    setKeterangan("");
    setLinkThumbnail("");
    setLinkVideo("");
  };

  const handledelet = () => {
    const token = localStorage.getItem("dataloginadmin");
    const dataSend = {
      id_konten: idDel,
      token: token,
    };
    fetch(`${"http://127.0.0.1:8000"}/hapusKonten`, {
      method: "POST",
      body: JSON.stringify(dataSend),
      headers: {
        "Content-Type": "applicatiom/json",
      },
    })
      .then((res) => res.json())
      .then((hasil) => {
        getyData();
        setShowDelete(false);
        swal("success", hasil.message, "succsess");
      })
      .catch((err) => {
        alert(err);
      });
  };

  const handleShowUpdate = (data) => {
    setShowEdit(true);
    setIdUpadate(data.id_konten);
    setJudul(data.judul);
    setKeterangan(data.keterangan);
    setLinkThumbnail(data.link_thumbnail);
    setLinkVideo(data.link_vidio);
  };

  const handleSimpanUpdate = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("dataloginadmin");
    const dataSend = {
      id_konten : idUpadte,
      judul: judul,
      keterangan: keterangan,
      link_thumbnail: link_thumbnail,
      link_vidio: link_vidio,
      token: token,
      
    }
    console.log(dataSend)
    fetch(`${"http://127.0.0.1:8000"}/ubahKonten`, {
      method: "POST",
      body: JSON.stringify(dataSend),
      headers: {
        "Content-Type": "applicatiom/json",
      },
    })
      .then((res) => res.json())
      .then((hasil) => {
        console.log(hasil)
        if(hasil.status === 'berhasil'){
        getyData();
        clearState();
        setShowEdit(false);
        swal('succsess',hasil.message, 'success');
      }else{
        clearState();

        swal('failed', hasil.message, 'error');

      }
    })
      .catch((err) => {
        alert(err);
        clearState();

      });
  };
  const LOGOUT = () =>{
    localStorage.removeItem("dataloginadmin");
    history.push('/login-admin')


  }
  return (
    <>
      <Modal show={hanldeShowVidio} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
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
      {/* modal tambah vidio */}
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Tambah Vidio
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label htmlFor="judul">Judul</label>
              <input
                onChange={(e) => setJudul(e.target.value)}
                value={judul}
                type="text"
                className="form-control"
                id="judul"
                placeholder="judul"
              />
            </div>

            <div className="form-group">
              <label htmlFor="keterangan">keterangan</label>
              <input
                onChange={(e) => setKeterangan(e.target.value)}
                value={keterangan}
                type="text"
                className="form-control"
                id="keterangan"
                placeholder="keterangan"
              />
            </div>

            <div className="form-group">
              <label htmlFor="link_thumbnail">link_thumbnail</label>
              <input
                onChange={(e) => setLinkThumbnail(e.target.value)}
                value={link_thumbnail}
                type="text"
                className="form-control"
                id="link_thumbnail"
                placeholder="link_thumbnail"
              />
            </div>

            <div className="form-group">
              <label htmlFor="link_vidio">link_vidio</label>
              <input
                onChange={(e) => setLinkVideo(e.target.value)}
                value={link_vidio}
                type="text"
                className="form-control"
                id="link_vidio"
                placeholder="link_vidio"
              />
            </div>
            <button
              onClick={(e) => handleSimpan(e)}
              className="btn btn-primary"
            >
              SIMPAN
            </button>
          </form>
        </Modal.Body>
      </Modal>

      {/* modal delet vidio */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            CANCEL
          </Button>
          <Button variant="danger" onClick={handledelet}>
            DELETE
          </Button>
        </Modal.Footer>
      </Modal>

      {/* modal edit vidio */}

      <Modal
        size="lg"
        show={showEditvidio}
        onHide={() => setShowEdit(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Edit Vidio
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label htmlFor="judul">Judul</label>
              <input
                onChange={(e) => setJudul(e.target.value)}
                value={judul}
                type="text"
                className="form-control"
                id="judul"
                placeholder="judul"
              />
            </div>

            <div className="form-group">
              <label htmlFor="keterangan">keterangan</label>
              <input
                onChange={(e) => setKeterangan(e.target.value)}
                value={keterangan}
                type="text"
                className="form-control"
                id="keterangan"
                placeholder="keterangan"
              />
            </div>

            <div className="form-group">
              <label htmlFor="link_thumbnail">link_thumbnail</label>
              <input
                onChange={(e) => setLinkThumbnail(e.target.value)}
                value={link_thumbnail}
                type="text"
                className="form-control"
                id="link_thumbnail"
                placeholder="link_thumbnail"
              />
            </div>

            <div className="form-group">
              <label htmlFor="link_vidio">link_vidio</label>
              <input
                onChange={(e) => setLinkVideo(e.target.value)}
                value={link_vidio}
                type="text"
                className="form-control"
                id="link_vidio"
                placeholder="link_vidio"
              />
            </div>
            <button
              onClick={(e) => handleSimpanUpdate(e)}
              className="btn btn-primary"
            >
              SIMPAN
            </button>
          </form>
        </Modal.Body>
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
          onClick={() => setLgShow(true)}
          className="btn btn-primary btn-lg"
          role="button"
        >
          + tambah vidio
        </button>
        <Link to="/list-user" className="btn btn-success btn-lg ml-3" role="button">
          User
        </Link>
        <button
          onClick={() => LOGOUT()}
          className="btn btn-primary  btn-lg ml-3"
          role="button"
        >
          LOGOUT
        </button>
      </div>
      <div className="row justify-content-center">
        {datalistVidio?datalistVidio.map((data, index) => {
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
                <button
                  onClick={() => handleShow(data.id_konten)}
                  className="btn btn-danger mr-3"
                >
                  DELETE
                </button>
                <button
                  onClick={() => handleShowUpdate(data)}
                  className="btn btn-success mr-3"
                >
                  EDIT
                </button>
              </div>
            </div>
          );
        }):''}
      </div>
    </>
  );
};

export default ListVidioAdmin;
