import apiFecth from "../axios/apiAxios";

export const allAuthors = async () => {
    try {
        const response = await apiFecth.get(`/Authors`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const deleteAuhtor = async (id, config) => {
    try {
        const response = await apiFecth.delete(`/Authors/${id}`, config);
        return response.data;
    } catch {
        throw error;
    }
}

export const oneAuthor = async (id) => {
    try {
        const response = await apiFecth.get(`/Authors/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const updateAuthor = async (id, authors, config) => {
    try {
        const response = await apiFecth.put(`/Authors/${id}`, authors, config);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const insertAuthor = async (authors, config) => {
    try {
        const response = await apiFecth.post(`/Authors`, authors, config);
        return response.data;
    } catch (error) {
        throw error;
    }
}