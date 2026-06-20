import axios from "axios";

const API_URL = "http://localhost:5000";

export const getApplications = async (filters = {}) => {

    const token = localStorage.getItem("token");

    const query = new URLSearchParams(filters).toString();

    const response = await axios.get(
        `http://localhost:5000/applications?${query}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};
export const createApplication =
    async (applicationData) => {

        const token =
            localStorage.getItem("token");

        const response =
            await axios.post(
                `${API_URL}/applications`,
                applicationData,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

        return response.data;

};
export const deleteApplication =
async (id) => {

    const token =
        localStorage.getItem("token");

    const response =
        await axios.delete(
            `${API_URL}/applications/${id}`,
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        );

    return response.data;

};
export const updateApplication =
async (
    id,
    applicationData
) => {

    const token =
        localStorage.getItem("token");

    const response =
        await axios.put(
            `${API_URL}/applications/${id}`,
            applicationData,
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        );

    return response.data;

};