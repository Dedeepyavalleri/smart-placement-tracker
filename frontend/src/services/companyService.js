import axios from "axios";

const API_URL = "http://localhost:5000";

export const getCompanies = async (search = "") => {

    const token = localStorage.getItem("token");

    const response = await axios.get(
        `${API_URL}/companies?search=${search}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};

export const addCompany = async (companyData) => {

    const token =
        localStorage.getItem("token");

    const response =
        await axios.post(
            `${API_URL}/companies`,
            companyData,
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        );

    return response.data;
};

export const deleteCompany = async (id) => {

    const token =
        localStorage.getItem("token");

    const response =
        await axios.delete(
            `${API_URL}/companies/${id}`,
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        );

    return response.data;
};

export const updateCompany =
async (id, companyData) => {

    const token =
        localStorage.getItem("token");

    const response =
        await axios.put(
            `${API_URL}/companies/${id}`,
            companyData,
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        );

    return response.data;

};