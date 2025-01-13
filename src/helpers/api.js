import http from "../constants/axios"
import { keys } from "../constants/config";
import { httpErrorHandler, httpResponseHandler } from "./handler"
import { getData } from "./localstorage";

const urlParams = (params) => {
    let paramsArray = [];
    Object.keys(params).map((value) => {
        return paramsArray.push(`${value}=${params[value]}`);
    });
    return paramsArray.join("&");
}

/**
 * Http get method request
 * @param {*} path 
 * @param {*} params 
 * @returns 
 */
export const getRequest = async (path, params) => {
    try {
        const url = params ? `${path}?${urlParams(params)}` : path;
        const result = await http.get(url);
        return httpResponseHandler(result);
    } catch (error) {
        return httpErrorHandler(error);
    }
}

export const featchGetRequest = async (path, params, ext='xlsx') => {
    try {
        const token = getData(keys.API_TOKEN) ? getData(keys.API_TOKEN) : null;
        const response = await fetch(params ? `${path}?${urlParams(params)}` : path, {
            method: 'GET',
            headers: {'authorization': `Bearer ${token}`},
        });
        if(response.status == 200){
            const blob = await response.blob();
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `datas.${ext}`);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        }
        return response
    } catch (error) {
        return httpErrorHandler(error);
    }
}

/**
 * Http post method request 
 * @param {*} path 
 * @param {*} payload 
 * @returns 
 */
export const postRequest = async (path, payload) => {
    try {
        const result = await http.post(path, payload);
        return httpResponseHandler(result);
       
        
    } catch (error) {
        return httpErrorHandler(error);
    }
}

/**
 * Http put method request
 * @param {*} path 
 * @param {*} payload 
 * @returns 
 */
export const putRequest = async (path, payload) => {
    try {
        const result = await http.put(path, payload);
        return httpResponseHandler(result);
    } catch (error) {
        return httpErrorHandler(error);
    }
}

/**
 * Http delete method request
 * @param {*} path 
 * @returns 
 */
export const delRequest = async (path) => {
    try {
        const result = await http.delete(path);
        return httpResponseHandler(result);
    } catch (error) {
        return httpErrorHandler(error);
    }  
}
