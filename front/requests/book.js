import apiFecth from "../axios/apiAxios";

export const allBooksCover = async () => {
    try {
        const response = await apiFecth.get(`/Books`);
        return response.data;
    } catch (error) {
        console.log(error)
        throw error;
    }
}

export const oneBook = async (id) => {
    try {
        const response = await apiFecth.get(`/Books/${id}`);
        return response.data;
    } catch (error) {
        console.log(error)
        throw error;
    }
}


export const updateBook = async (id, formDataObject, config) => {
    try {
        const response = await apiFecth.patch(`/Books/${id}`, formDataObject, config);
        return response.data;
    } catch {
        console.log(error)
        throw error;
    }
}

export const insertBooks = async (formData, config) => {
    try {
        const response = await apiFecth.post(`/Books`, formData, config);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


export const deleteBook = async (id, config) => {
    try {
        const response = await apiFecth.delete(`/Books/${id}`, config);
        return response.data;
    } catch {
        throw error;
    }
}

