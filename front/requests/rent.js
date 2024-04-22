import apiFecth from "../axios/apiAxios";

export const allRents = async () => {
    try {
        const response = await apiFecth.get(`/Rents`);
        return response.data;
    } catch (error) {
        throw error;
    }
}



export const rentsDelete = async (id, config) => {
    try {
        const response = await apiFecth.delete(`/Rents/${id}`, config);
        return response.data;
    } catch {
        throw error;
    }
}

export const oneRent = async (id) => {
    try {
        const response = await apiFecth.get(`/Rents/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const insertRent = async (dataForInsert, config) => {
    try {
        const response = await apiFecth.post(`/Rents`, dataForInsert, config);
        return response.data;
    } catch (error) {
        console.log(error)
        throw error;
    }
}

export const updateRents = async (id, dataForInsert, config) => {
    try {
        const response = await apiFecth.patch(`/Rents/${id}`, dataForInsert, config);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const dataOneRent = async (id) => {
    try {
        const response = await apiFecth.get(`/Rents/${id}/one`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

