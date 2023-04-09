import image from "../Images/fiore-di-loto-.jpg";
import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import Card from "react-bootstrap/Card";

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
        <div className="position-absolute d-flex flex-column hero align-items-center">
          {weather.name ? <h3 className="fw-bold">{weather.name}</h3> : null}
          {weather.main ? (
            <p className="fw-bold">{weather.main.temp}&#176;C</p>
          ) : null}
          {weather.weather ? (
            <p className="fw-bold">{weather.weather[0].description}</p>
          ) : null}
        </div>
        <div>
          {/* {prediction[0].list.slice(1, 5).map((day, i) => (
            <Card key={i.dt} data={i} style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
              </Card.Body>
            </Card>
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default MyHome;
