import axios from 'axios';

const API_BASE_URL = 'https://euyd3vf3ol.execute-api.eu-north-1.amazonaws.com';


export const logExpense = async (expenseData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/log-expense`, expenseData);
    return response.data;
  } catch (error) {
    console.error('Error logging expense:', error.response?.data || error.message);
    throw error;
  }
};

export const getExpenses = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/expenses?userId=${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching expenses:', error.response?.data || error.message);
    throw error;
  }
};

export const deleteExpense = async (userId, timestamp) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/delete-expense`, {
      data: { userId, timestamp },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting expense:', error.response?.data || error.message);
    throw error;
  }
};
