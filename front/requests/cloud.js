import apiFecth from "../axios/apiAxios";

export const imgForUrl = async (img) => {
    try {
        const response = await apiFecth.post(`/Cloud`, img);
        return response.data;
    } catch (error) {
        console.log(error)
        throw error;
    }
}