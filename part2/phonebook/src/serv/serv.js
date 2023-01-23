import axios from 'axios';
const http = "http://localhost:3001/persons"

const getAll = () => {
    return axios.get(http).then(res => res.data)
}
const create = (obj) => {
    return axios.post(http, obj).then(res => res.data)
}
const rm = (id) => {
    return axios.delete(`${http}/${id}`)
}
const update = (id, obj) => {
    return axios.put(`${http}/${id}`, obj).then(res => res.data)
}
export default {getAll, create, rm, update}