import axios from "axios";

const API_URL =
    "http://localhost:5000";

export const getNotes =
async () => {

    const token =
        localStorage.getItem("token");

    const response =
        await axios.get(
            `${API_URL}/notes`,
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        );

    return response.data;

};

export const createNote =
async (noteData) => {

    const token =
        localStorage.getItem("token");

    const response =
        await axios.post(
            `${API_URL}/notes`,
            noteData,
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        );

    return response.data;

};

export const deleteNote =
async (id) => {

    const token =
        localStorage.getItem("token");

    const response =
        await axios.delete(
            `${API_URL}/notes/${id}`,
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        );

    return response.data;

};

export const updateNote =
async (
    id,
    noteData
) => {

    const token =
        localStorage.getItem("token");

    const response =
        await axios.put(
            `${API_URL}/notes/${id}`,
            noteData,
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        );

    return response.data;

};