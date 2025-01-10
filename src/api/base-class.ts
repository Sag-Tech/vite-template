import { AxiosInstance, AxiosRequestConfig } from 'axios'
import api from './instance'

export default abstract class BaseApiClass {
    protected instance: AxiosInstance

    constructor() {
        this.instance = api
    }

    protected baseGetMethod<ResponceType>(
        url: string,
        config?: AxiosRequestConfig
    ) {
        return this.instance.get<ResponceType>(`${url}`, config)
    }

    protected basePostMethod<ResponceType>(
        url: string,
        body?: any,
        options?: AxiosRequestConfig
    ) {
        return this.instance.post<ResponceType>(`${url}`, body, options)
    }

    protected basePutMethod<ResponceType>(
        url: string,
        body?: any,
        options?: AxiosRequestConfig
    ) {
        return this.instance.put<ResponceType>(`${url}`, body, options)
    }

    protected basePatchMethod<ResponceType>(
        url: string,
        body?: any,
        options?: AxiosRequestConfig
    ) {
        return this.instance.patch<ResponceType>(`${url}`, body, options)
    }

    protected baseDeleteMethod<ResponceType>(
        url: string,
        config?: AxiosRequestConfig
    ) {
        return this.instance.delete<ResponceType>(`${url}`, config)
    }
}
