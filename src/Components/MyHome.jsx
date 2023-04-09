import image from "../Images/fiore-di-loto-.jpg";
import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";

const MyHome = () => {
  const [found, setFound] = useState([]);
  const [content, setContent] = useState("");
  const handlechange = (e) => {
    setContent(e.target.value);
  };
  const handlesubmit = async (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    fetchWeather();
    secondFetch();
  }, [content]);

  const key = "875cdbaea720a7925be5d0c4d470a196";

  const fetchWeather = async () => {
    try {
      const luogo = content;
      const firstOne =
        "http://api.openweathermap.org/geo/1.0/direct?q=" + luogo + "&appid=";

      const resp = await fetch(firstOne + key);
      console.log(resp);
      if (resp.ok) {
        const data = await resp.json();
        console.log(data);
        setFound(data);
        console.log(found + "trovato");

        console.log("chimata andata a buon fine!");
      }
    } catch (err) {
      console.log("qualcosa non va!");
    }
  };
  const lat = [];
  const long = [];
  found.map((item) => (lat.push(item.lat), long.push(item.lon)));
  console.log("lat ottenuta", lat);
  console.log("long trovata", long);

  const secondFetch = async () => {
    try {
      const secondOne =
        "https://api.openweathermap.org/data/2.5/weather?lat=" +
        lat +
        "&lon=" +
        long +
        "&appid=";
      const resp1 = await fetch(secondOne + key);
      console.log(resp1);
      if (resp1.ok) {
        const data1 = await resp1.json();
        console.log(data1);
      }
    } catch (error) {
      console.log("non è andato a buon fine!");
    }
  };

  return (
    <div id="sfondo">
      <div className="d-flex position-relative">
        <img id="loto" src={image} alt="Sfondo-loto" />
        <div className="position-relative search">
          <Form onSubmit={handlesubmit}>
            <Form.Control
              type="text"
              placeholder="Cerca Località"
              value={content}
              onChange={handlechange}
            />
            <Button variant="success" type="submit">
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </Button>
          </Form>
        </div>
        <div className="position-absolute d-flex flex-column hero align-items-center">
          <p className="fw-bold">Soleggiato</p>
          <h3 className="fw-bold">23°</h3>
          <p className="fw-bold">Berlino</p>
        </div>
        <div className="position-absolute d-flex hero align-items-center"></div>
      </div>
    </div>
  );
};

export default MyHome;
