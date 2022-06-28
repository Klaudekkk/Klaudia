import { useEffect, useState } from "react";
import axios from "axios"
import toilet from './toilet.png'

const App = () => {
  const [data, setData] = useState("Kliknij i sprawdź czy możesz iść!");
  const [fetchData, setFetch] = useState(false);
  var styles = {}
  useEffect(() => {
    if (fetchData) {
      axios.get('https://rpitoilet.azurewebsites.net/api/GetLatestEntry?code=FGfkf7SuLNZkoiHeco08Zyfod20TcnXpNp2gNe1MkTBdAzFunYDqSw==')
        .then((res) => setData(res.data.state));
    }
  }, [fetchData]);

  if(data == 'Toaleta jest wolna, powodzenia!'){
    styles = {
      color: "green"
    }
  }
  else {
    styles = {
      Color:"red",
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
            <center><img src={toilet} width={200}/></center>
            <button className="fill" onClick={() => setFetch(prevFetchData => !prevFetchData)}>Sprawdzam!</button>
          </div>


        </div>
        <div className="footer">Patryk Żuchowski & Klaudia Wojciechowska</div>
      </div>
      </body>
      </html>
  );
};
export default App;