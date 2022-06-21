import { useEffect, useState } from "react";
import axios from "axios"

const App = () => {
  const [data, setData] = useState("Oczekiwanie na klikniecie");
  const [fetchData, setFetch] = useState(false);
  var styles = {}
  useEffect(() => {
    if (fetchData) {
      axios.get('https://rpitoilet.azurewebsites.net/api/GetLatestEntry?code=FGfkf7SuLNZkoiHeco08Zyfod20TcnXpNp2gNe1MkTBdAzFunYDqSw==')
        .then((res) => setData(res.data.state));
    }
  }, [fetchData]);

  if (data == "Oczekiwanie na klikniecie") {
    styles = { backgroundColor: "yellow" }
  }
  else {
    styles = {
      backgroundColor: data == 'wolne' ? "green" : "red"
    }
  }
  return (
      <html>
      <head></head>
      <body>
      <div className="layout">
        <div className="header">
          <center>
            <h1>Twój asystent toaletowy</h1>
          </center>

        </div>
        <div className="main">
          <div style={styles} className="states">
            <h1>{data}</h1>
            <button onClick={() => setFetch(prevFetchData => !prevFetchData)}>Fetch Data</button>
          </div>
        </div>
        <div className="footer">Patryk Żuchowski & Klaudia Wojciechowska</div>
      </div>
      </body>
      </html>
  );
};
export default App;