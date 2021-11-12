/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const SoalQuiz = () => {
  const history = useHistory();

  const [soal, SetSoal] = useState([]);
  const [cek, setCek] = useState([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const login = localStorage.getItem("dataloginuser");
    if(!login){
      history.push('/')
      return
    }
    getListSoal();
  }, []);

  const getListSoal = () => {
    const token = localStorage.getItem("dataloginuser");
    const senData = {
      token
    };

    fetch(`${"http://127.0.0.1:8000"}/listSoal`, {
      method: "POST",
      body: JSON.stringify(senData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((hasil) => {
        if (hasil.status === "berhasil") {
          SetSoal(hasil)
          console.log(hasil)
        } else {
          localStorage.removeItem("dataloginuser");
          history.replace("/");
        }
      })
      .catch((err) => {
        alert(err)
      //if(err) window.location.reload()
      });
  };

  const handleleSubmid = (e, index, res) => {
    setStatus("");
    const token = localStorage.getItem("dataloginuser");
    let newData = cek;
    const sndDatasoal = {
      token,
    };

    const sendData = {
      token,
      id_soal: res.id_soal,
      jawaban: e.target.value,
      id_skor: soal.id_skor,
    };

    fetch(`${"http://127.0.0.1:8000"}/jawab`, {
      method: "POST",
      body: JSON.stringify(sendData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((hasil) => {
        newData[index] = true;
        setCek(newData);
        setStatus("berhasil");
        if (hasil.status === "gagal") {
          history.replace("/");
          localStorage.removeItem("dataloginuser");
          return;
        }
        fetch(`${"http://127.0.0.1:8000"}/listSoal`, {
          method: "POST",
          body: JSON.stringify(sndDatasoal),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((hasil) => {
            if (hasil.status === "gagal") {
              history.replace("/");
              return;
            }
            if (hasil.data[0].jumlah_jawaban === 10) {
              history.replace("/Skor");
              return;
            }
          })
          .catch((err) => {
            alert(err);
          });
      })
      .catch((err) => {
        alert(err);
      });
  };
  return (
    <>
      <div className="soal-lomba" style={{ paddingTop: 100 }}>
        <h1 className="text-center pb-5">Soal Quiz</h1>
        <div className="container soalcard">
          <form>
            {soal?.data?.map((res, index) => {
              return (
                <div key={index} className="soal-1">
                  <div>
                    <p className="m-0">{`${index + 1} ${res.pertayanan}`}</p>
                    <div className="soal-1 d-flex flex-column">
                      {index + 1 > res.jumlah_jawaban ? (
                        <>
                          <div className="option-group d-flex align-items-top py-1">
                            <div>
                              <input
                                value={res.opsi1}
                                onClick={(e) => handleleSubmid(e, index, res)}
                                type="radio"
                                name={`soal- ${index + 1}`}
                                id={`s1-${index + 1}`}
                                disabled={cek[index]}
                              />
                            </div>
                            <div className="ml-3">
                              <label htmlFor={`s1-${index + 1}`}>
                                A. {res.opsi1}
                              </label>
                            </div>
                          </div>
                          <div className="option-group d-flex align-items-top py-1">
                            <div>
                              <input
                                value={res.opsi2}
                                onClick={(e) => handleleSubmid(e, index, res)}
                                type="radio"
                                name={`soal- ${index + 1}`}
                                id={`s1-${index + 2}`}
                                disabled={cek[index]}
                              />
                            </div>
                            <div className="ml-3">
                              <label htmlFor={`s1-${index + 2}`}>
                                B. {res.opsi2}
                              </label>
                            </div>
                          </div>
                          <div className="option-group d-flex align-items-top py-1">
                            <div>
                              <input
                                value={res.opsi3}
                                onClick={(e) => handleleSubmid(e, index, res)}
                                type="radio"
                                name={`soal- ${index + 1}`}
                                id={`s1-${index + 3}`}
                                disabled={cek[index]}
                              />
                            </div>
                            <div className="ml-3">
                              <label htmlFor={`s1-${index + 3}`}>
                                C. {res.opsi3}
                              </label>
                            </div>
                          </div>
                          <div className="option-group d-flex align-items-top py-1">
                            <div>
                              <input
                                value={res.opsi4}
                                onClick={(e) => handleleSubmid(e, index, res)}
                                type="radio"
                                name={`soal- ${index + 1}`}
                                id={`s1-${index + 4}`}
                                disabled={cek[index]}
                              />
                            </div>
                            <div className="ml-3">
                              <label htmlFor={`s1-${index + 4}`}>
                                D. {res.opsi4}
                              </label>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="option-group d-flex align-items-top py-1">
                            <div>
                              <input
                                value={res.opsi1}
                                type="radio"
                                name={`soal- ${index + 1}`}
                                id={`s1-${index + 1}`}
                                disabled
                              />
                            </div>
                            <div className="ml-3">
                              <label htmlFor={`s1-${index + 1}`}>
                                A. {res.opsi1}
                              </label>
                            </div>
                          </div>
                          <div className="option-group d-flex align-items-top py-1">
                            <div>
                              <input
                                value={res.opsi2}
                                type="radio"
                                name={`soal- ${index + 1}`}
                                id={`s1-${index + 2}`}
                                disabled
                              />
                            </div>
                            <div className="ml-3">
                              <label htmlFor={`s1-${index + 2}`}>
                                B. {res.opsi2}
                              </label>
                            </div>
                          </div>
                          <div className="option-group d-flex align-items-top py-1">
                            <div>
                              <input
                                value={res.opsi3}
                                type="radio"
                                name={`soal- ${index + 1}`}
                                id={`s1-${index + 3}`}
                                disabled
                              />
                            </div>
                            <div className="ml-3">
                              <label htmlFor={`s1-${index + 3}`}>
                                C. {res.opsi3}
                              </label>
                            </div>
                          </div>
                          <div className="option-group d-flex align-items-top py-1">
                            <div>
                              <input
                                value={res.opsi4}
                                type="radio"
                                name={`soal- ${index + 1}`}
                                id={`s1-${index + 4}`}
                                disabled
                              />
                            </div>
                            <div className="ml-3">
                              <label htmlFor={`s1-${index + 4}`}>
                                D. {res.opsi4}
                              </label>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </form>
        </div>
      </div>
    </>
  );
};

export default SoalQuiz;
