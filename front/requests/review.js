import apiFecth from "../axios/apiAxios";

export const insertReview = async (id, formData, config) => {
    try {
        const response = await apiFecth.post(`/Reviews`, formData, config);
        return response.data;
    } catch (error) {
        console.log(error)
        throw error;
    }
}

export const allReview = async (id) => {
    try {

        const response = await apiFecth.get(`/Reviews/${id}`);
        return response.data;
    } catch (error) {
        console.log(error)
        throw error;
    }
}

export const deleteReview = async (idReview) => {
    try {   
        const response = await apiFecth.delete(`/Reviews/${idReview}`);
        return response.data;
    } catch (error) {
        console.log(error)
        throw error;
    }
}


