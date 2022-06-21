import { useEffect, useState } from "react";
import axios from "axios"

const App = () => {
  const [data, setData] = useState(null);
  const [fetchData, setFetch] = useState(false);

  useEffect(() => {
    if (fetchData) {
      axios.get('https://rpitoilet.azurewebsites.net/api/GetLatestEntry?code=FGfkf7SuLNZkoiHeco08Zyfod20TcnXpNp2gNe1MkTBdAzFunYDqSw==')
        .then((res) => setData(res.data.state));
    }
  }, [fetchData]);
  const styles = {
    backgroundColor: data == 'wolne' ? "green" : "red"
  }
  return (




      
    <div style={styles} className="states">
      <h1>{data}</h1>
      <button onClick={() => setFetch(prevFetchData => !prevFetchData)}>Fetch Data</button>
    </div>
  );
};
export default App;