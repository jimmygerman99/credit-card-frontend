//This is where we are going to manage our backend calls

import axios from "axios";

const API_BASE = "/api";

export const getTransactions = async () => {
    return axios.get(`${API_BASE}/transactions`);
};

export const createTransaction = async (transaction) => {
    return axios.post(`${API_BASE}/transactions`, transaction);
};
