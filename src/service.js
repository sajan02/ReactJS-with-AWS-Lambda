import axios from 'axios';

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