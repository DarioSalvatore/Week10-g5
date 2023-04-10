import image from "../Images/fiore-di-loto-.jpg";
import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import logo from "../Images/logo.png";

const MyHome = () => {
  const [found, setFound] = useState([]);
  const [weather, setWeather] = useState([]);
  const [prediction, setPrediction] = useState([]);
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
        fiveDays();
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
      const resp1 = await fetch(secondOne + key + "&units=metric");
      console.log(resp1);
      if (resp1.ok) {
        const data1 = await resp1.json();

        setWeather(data1);
        console.log(weather);
      }
    } catch (error) {
      console.log("non è andato a buon fine!");
    }
  };

  const fiveDays = async () => {
    try {
      const predictFetch = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=875cdbaea720a7925be5d0c4d470a196`;

      const resp2 = await fetch(predictFetch + "&units=metric");
      if (resp2.ok) {
        const data2 = await resp2.json();
        setPrediction(data2);
      }
    } catch (err) {
      console.log("hai fallito!");
    }
  };

  console.log("hai trovato", prediction);
  return (
    <div id="sfondo">
      <div className="d-flex position-relative">
        <img id="loto" src={image} alt="Sfondo-loto" />
        <div className="logo">
          <img src={logo} alt="page-logo" width={100} height={50} />
          <h1>Weather_Lotus</h1>
        </div>
        <div className="position-relative search">
          <Form onSubmit={handlesubmit}>
            <Form.Control
              type="text"
              placeholder="Cerca Località"
              value={content}
              onChange={handlechange}
            />
          </Form>
        </div>
        <div className="position-absolute d-flex flex-column hero align-items-center text-center">
          {weather.name ? <h3 className="fw-bold">{weather.name}</h3> : null}
          {weather.main ? (
            <p className="fw-bold">{weather.main.temp}&#176;C</p>
          ) : null}
          {weather.weather ? (
            <p className="fw-bold">{weather.weather[0].description}</p>
          ) : null}
        </div>
        <div className="daySection">
          <div>
            {prediction.list ? (
              <Card className="nextDayBackground" style={{ width: "16rem" }}>
                <Card.Body>
                  <Card.Title>{prediction.list[0].dt_txt}</Card.Title>
                  <Card.Text>
                    <p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="currentColor"
                        class="bi bi-thermometer-half"
                        viewBox="0 0 16 16"
                      >
                        <path d="M9.5 12.5a1.5 1.5 0 1 1-2-1.415V6.5a.5.5 0 0 1 1 0v4.585a1.5 1.5 0 0 1 1 1.415z" />
                        <path d="M5.5 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0V2.5zM8 1a1.5 1.5 0 0 0-1.5 1.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0l-.166-.15V2.5A1.5 1.5 0 0 0 8 1z" />
                      </svg>
                      {prediction.list[0].main.temp}&#176;C
                    </p>
                    <p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="currentColor"
                        class="bi bi-brightness-high"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
                      </svg>
                      {prediction.list[0].weather[0].description}
                    </p>
                    <p>
                      <svg
                        className="me-2"
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="currentColor"
                        class="bi bi-wind"
                        viewBox="0 0 16 16"
                      >
                        <path d="M12.5 2A2.5 2.5 0 0 0 10 4.5a.5.5 0 0 1-1 0A3.5 3.5 0 1 1 12.5 8H.5a.5.5 0 0 1 0-1h12a2.5 2.5 0 0 0 0-5zm-7 1a1 1 0 0 0-1 1 .5.5 0 0 1-1 0 2 2 0 1 1 2 2h-5a.5.5 0 0 1 0-1h5a1 1 0 0 0 0-2zM0 9.5A.5.5 0 0 1 .5 9h10.042a3 3 0 1 1-3 3 .5.5 0 0 1 1 0 2 2 0 1 0 2-2H.5a.5.5 0 0 1-.5-.5z" />
                      </svg>
                      {prediction.list[0].wind.speed}K/h
                    </p>
                  </Card.Text>
                </Card.Body>
              </Card>
            ) : null}
          </div>
          <div>
            {prediction.list ? (
              <Card className="nextDayBackground" style={{ width: "16rem" }}>
                <Card.Body>
                  <Card.Title>{prediction.list[8].dt_txt}</Card.Title>
                  <Card.Text>
                    <p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="currentColor"
                        class="bi bi-thermometer-half"
                        viewBox="0 0 16 16"
                      >
                        <path d="M9.5 12.5a1.5 1.5 0 1 1-2-1.415V6.5a.5.5 0 0 1 1 0v4.585a1.5 1.5 0 0 1 1 1.415z" />
                        <path d="M5.5 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0V2.5zM8 1a1.5 1.5 0 0 0-1.5 1.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0l-.166-.15V2.5A1.5 1.5 0 0 0 8 1z" />
                      </svg>
                      {prediction.list[8].main.temp}&#176;C
                    </p>
                    <p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="currentColor"
                        class="bi bi-brightness-high"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
                      </svg>
                      {prediction.list[8].weather[0].description}
                    </p>
                    <p>
                      <svg
                        className="me-2"
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="currentColor"
                        class="bi bi-wind"
                        viewBox="0 0 16 16"
                      >
                        <path d="M12.5 2A2.5 2.5 0 0 0 10 4.5a.5.5 0 0 1-1 0A3.5 3.5 0 1 1 12.5 8H.5a.5.5 0 0 1 0-1h12a2.5 2.5 0 0 0 0-5zm-7 1a1 1 0 0 0-1 1 .5.5 0 0 1-1 0 2 2 0 1 1 2 2h-5a.5.5 0 0 1 0-1h5a1 1 0 0 0 0-2zM0 9.5A.5.5 0 0 1 .5 9h10.042a3 3 0 1 1-3 3 .5.5 0 0 1 1 0 2 2 0 1 0 2-2H.5a.5.5 0 0 1-.5-.5z" />
                      </svg>
                      {prediction.list[8].wind.speed}K/h
                    </p>
                  </Card.Text>
                </Card.Body>
              </Card>
            ) : null}
          </div>
          <div>
            {prediction.list ? (
              <Card className="nextDayBackground" style={{ width: "16rem" }}>
                <Card.Body>
                  <Card.Title>{prediction.list[16].dt_txt}</Card.Title>
                  <Card.Text>
                    <p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="currentColor"
                        class="bi bi-thermometer-half"
                        viewBox="0 0 16 16"
                      >
                        <path d="M9.5 12.5a1.5 1.5 0 1 1-2-1.415V6.5a.5.5 0 0 1 1 0v4.585a1.5 1.5 0 0 1 1 1.415z" />
                        <path d="M5.5 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0V2.5zM8 1a1.5 1.5 0 0 0-1.5 1.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0l-.166-.15V2.5A1.5 1.5 0 0 0 8 1z" />
                      </svg>
                      {prediction.list[16].main.temp}&#176;C
                    </p>
                    <p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="currentColor"
                        class="bi bi-brightness-high"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
                      </svg>
                      {prediction.list[16].weather[0].description}
                    </p>
                    <p>
                      <svg
                        className="me-2"
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="currentColor"
                        class="bi bi-wind"
                        viewBox="0 0 16 16"
                      >
                        <path d="M12.5 2A2.5 2.5 0 0 0 10 4.5a.5.5 0 0 1-1 0A3.5 3.5 0 1 1 12.5 8H.5a.5.5 0 0 1 0-1h12a2.5 2.5 0 0 0 0-5zm-7 1a1 1 0 0 0-1 1 .5.5 0 0 1-1 0 2 2 0 1 1 2 2h-5a.5.5 0 0 1 0-1h5a1 1 0 0 0 0-2zM0 9.5A.5.5 0 0 1 .5 9h10.042a3 3 0 1 1-3 3 .5.5 0 0 1 1 0 2 2 0 1 0 2-2H.5a.5.5 0 0 1-.5-.5z" />
                      </svg>
                      {prediction.list[16].wind.speed}K/h
                    </p>
                  </Card.Text>
                </Card.Body>
              </Card>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyHome;
