import axios from 'axios';

const useFetchData = (url, setData, setLoading) => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('data fetch error: ', error);
      }
    };

    fetchData();
};

export default useFetchData;