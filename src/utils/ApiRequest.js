import axios from 'axios';

const URL = import.meta.env.VITE_SERVER_URL;

export const getRequest = async (endPoint) => await axios.get(`${URL}/${endPoint}`);
export const postRequest = async (endPoint, sendData) => await axios.post(`${URL}/${endPoint}`, sendData);
// export const updateRequest = async (endPoint, sendData, id) => await axios.post(`${URL}/${endPoint}`, sendData);
export const updateRequest = async (endPoint, sendData, id) => await axios.post(`${URL}/${endPoint}/${id}`, sendData);
export const deleteRequest = async (endPoint, id) => await axios.post(`${URL}/${endPoint}/${id}`);

export default URL;
