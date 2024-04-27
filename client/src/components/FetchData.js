import { useState, useEffect, useCallback } from "react";
import './Table.css';

const FetchData = () => {
  // const [text, setText] = useState('');
  // const [dataJSON, setDataJSON] = useState([]);
  // const [time, setTime] = useState('');
  // const [token, setToken] = useState('')
  // const [isAuthenticated, setIsAuthenticated] = useState(false)

  // const dataSetup = useCallback(() => {
  //   const dataArray = text.split('\n');
  //   setTime(dataArray.slice(0, 1));
  //   dataArray.shift();
  //   const newDataArray = dataArray.map(d => {
  //     const [id, value] = d.split(':');
  //     return { id: parseInt(id), value: parseInt(value) };
  //   });
  //   newDataArray.pop();
  //   setDataJSON(newDataArray);
  // }, [text, setTime, setDataJSON])

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       setToken(localStorage.getItem('accessToken'))
  //       console.log(token)
  //       if(token === null) {
  //         throw new Error('No token found!')  
  //       }

  //       const response = await fetch('/api/data'
  //       , {
  //         headers: {
  //           'Authorization': `Bearer ${token}`
  //         }
  //       }
  //       );

  //       if(!response.ok) {
  //         throw new Error('Failed to fetch data')
  //       }
  //       setIsAuthenticated(true)
  //       const data = await response.text();
  //       setText(data)
  //       dataSetup()
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };
  //     fetchData();
  //   },[token, isAuthenticated, dataSetup]);
  // setTimeout(() => localStorage.removeItem('accessToken'), 300000)
  useEffect(() => {
    const options = {
      zoom: 5,
      center: {lat: 61.9241, lng: 25.7482}
    }
  
    const map = new google.maps.Map(document.getElementById('map'), options);
  })

  return (
    <div id='map'>
      <h1>Gambit-Labs</h1>
      <h2>TUF-2000M</h2>
      {/* {isAuthenticated ? (
        <div>
          <h3>Data was caught at: {time}</h3>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {dataJSON.map(dt => (
                <tr key={dt.id}>
                  <td><b>{dt.id}</b></td>
                  <td>{dt.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          <h3>User is not authenticated</h3>
          <p>Please log in to view the data!</p>
        </div>
      )} */}

      
    </div>
  );
};

export default FetchData;