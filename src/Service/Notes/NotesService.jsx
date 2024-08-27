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
    console.error('Error fetching notes:', error.response ? error.response.data : error.message);
    throw new Error('Failed to fetch notes');
  }
};

export const createNote = async (note) => {
  try {
    const response = await axios.post(`${API_URL}/notes`, note, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating note:', error.response ? error.response.data : error.message);
    throw new Error('Failed to create note');
  }
};
