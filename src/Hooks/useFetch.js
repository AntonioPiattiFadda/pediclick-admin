import { useEffect, useState } from 'react';
import axios from 'axios';

const useFetch = (endPoint) => {
  const [data, setData] = useState([]);
  async function fetchData() {
    const response = await axios.get(endPoint);
    setData(response.data);
  }

  useEffect(() => {
    try {
      fetchData();
    } catch (e) {
      console.log(e);
    }
  });
  return data;
};

export default useFetch;
