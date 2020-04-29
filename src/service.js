import axios from 'axios';

const BASE_URL = 'https://0j2kjmc6g4.execute-api.us-east-2.amazonaws.com/dev/user-details'

export const postUserDetail = async (payload) => {
    try {
        let resp = await axios.post(BASE_URL,payload);
        return resp.data;
    } catch (error) {
        alert(error.message);
    }
}