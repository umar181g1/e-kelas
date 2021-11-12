/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
const Skor = () => {
  const history = useHistory();
  const [skor, setSkor] = useState([]);
  useEffect(() => {
    getNilai();
    const login = localStorage.getItem("dataloginuser");
    if (!login) {
      history.push("/");
      return;
    }
  }, []);
  const getNilai = () => {
    const token = localStorage.getItem("dataloginuser");
    const senData = {
      token,
    };
    fetch(`${"http://127.0.0.1:8000"}/hitungSkor`, {
      method: "POST",
      body: JSON.stringify(senData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((hasil) => {
        console.log(hasil);
        if (hasil.status === "gagal") {
          history.replace("/");
          return;
        }
        setSkor(hasil);
      });
  };

  const handleCobalagi = () => {
    const token = localStorage.getItem("dataloginuser");
    const dataSend = {
      token,
    };
    fetch(`${"http://127.0.0.1:8000"}/selesaiUjian`, {
      method: "POST",
      body: JSON.stringify(dataSend),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((hasil) => {
        if (hasil.status === "berhasil") {
          history.replace("/quiz");
        } else {
          history.replace("/");
        }
      })
      .catch((err) => {
        alert(err);
      });
  };
  return (
    <>
      <div className="card" style={{ marginLeft: "auto", marginRight: "auto" }}>
        <div className="card-content" style={{ padding: 94 }}>
          <div className="content text-center text-black">
            <h3>Nilai Yang Kamu Peroleh</h3>
            <h1>{skor.skor ? skor.skor * 10 : [] * 10}</h1>
            <button
              onClick={() => handleCobalagi()}
              className="btn btn-info mt-2"
            >
              Coba Lagi
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Skor;
