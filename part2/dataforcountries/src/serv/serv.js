import axios from 'axios';

const http = "https://restcountries.com/v3.1/all";
const APIkey = process.env.REACT_APP_API_KEY;
const get = () => {
    return axios.get(http).then(res => res.data);
}
const getWeather = (lat, lon) => {
    return axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}`).then(res => res.data)
}
export default {get, getWeather}