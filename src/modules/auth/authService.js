
import { keys } from "../../constants/config";
import { endpoints } from "../../constants/endpoints";
import { postRequest } from "../../helpers/api"
import { httpServiceHandler } from "../../helpers/handler";
import { setData } from "../../helpers/localstorage";
import { updateMan, updateNotification, updateRole, updateUser } from "../../shares/shareSlice";

export const authService = {
    login: async (payload, dispatch) => {
        const response = await postRequest(endpoints.login, payload);

        await httpServiceHandler(dispatch, response);

        if(response.status === 200) {
           
            setData(keys.API_TOKEN, response.data.token);
            setData(keys.USER, response.data.user);

            setData(keys.ROLE,response.data.role);
            setData(keys.PERMISSION,response.data.permissions?.map(item => item.id));
            
            dispatch(updateMan(response.data.user));
            dispatch(updateRole(response.data.role));
            dispatch(updateNotification({
                variant : 'success',
                  message : response.message
            }))
        }
        
        return response;
    }
}