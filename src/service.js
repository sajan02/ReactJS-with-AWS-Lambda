import axios from 'axios';
import { objectToQueryString } from './Util/helperFunction';

const BASE_URL = process.env.REACT_APP_API_BASE_URL || '';
const STAGE = process.env.REACT_APP_STAGE || '';
const API_END_POINT = 'user-details';

export const postUserDetail = async (payload) => {
    try {
        let resp = await axios.post(`${BASE_URL}/${STAGE}/${API_END_POINT}`,payload);
        return resp.data;
    } catch (error) {
        alert(error.message);
    }
}

export const getAllUserDetail = async () => {
    try {
        let resp = await axios.get(`${BASE_URL}/${STAGE}/${API_END_POINT}/all`);
        return resp.data;
    } catch (error) {
        alert(error.message);
    }
}

export const putUserDetail = async (payload) => {
    try {
        let resp = await axios.put(`${BASE_URL}/${STAGE}/${API_END_POINT}`,payload);
        return resp.data;
    } catch (error) {
        alert(error.message);
    }
}

export const deleteUserDetail = async (queryObject, type = 'single',) => {
    try {
        let resp = await axios.delete(`${BASE_URL}/${STAGE}/${API_END_POINT}/${type}${objectToQueryString(queryObject)}`);
        console.log('data', resp.data);
        return resp.data;
    } catch (error) {
        alert(error.message);
    }
}