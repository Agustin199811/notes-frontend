import axios from 'axios';

const API_URL = 'http://localhost:8080';

export const fetchNotes = async () => {
  try {
    const response = await axios.get(`${API_URL}/notes`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch notes');
  }
};
