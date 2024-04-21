import apiFecth from "../axios/apiAxios";


export const allCategories = async () => {
    try {
        const response = await apiFecth.get(`/Categories`);
        return response.data;
    } catch (error) {
        throw error;
    }
}