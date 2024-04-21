import apiFecth from "../axios/apiAxios";

export const insertReview = async (id, formData, config) => {
    try {
        const response = await apiFecth.post(`/Review/${id}`, formData, config);
        return response.data;
    } catch (error) {
        console.log(error)
        throw error;
    }
}

export const allReview = async (id) => {
    try {
        const response = await apiFecth.get(`/Review/${id}`);
        return response.data;
    } catch (error) {
        console.log(error)
        throw error;
    }
}

export const deleteReview = async (idUrl, idReview) => {
    try {
        const response = apiFecth.delete(`/Review/${idUrl}/${idReview}`);
        return response.data;
    } catch (error) {
        console.log(error)
        throw error;
    }
}


