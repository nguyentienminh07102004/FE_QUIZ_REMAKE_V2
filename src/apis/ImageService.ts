import GetToken from "@/commons/utils/GetToken"
import apis from "./base"

export const UploadImage = async (data: FormData) => {
    const token = await GetToken();
    return (await apis.post('/images', data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })).data;
}