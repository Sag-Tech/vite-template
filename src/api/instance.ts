import { API_URL, LocalStorage } from '@/constants'
import axios, { InternalAxiosRequestConfig } from 'axios'

type RefreshToken = {
    accessToken: string
    refreshToken: string
}

const api = axios.create({
    baseURL: API_URL,
    withCredentials: false,
})

let isRefreshFetching = false
let refreshSubscribers: any[] = []

const onRefreshed = (token: string) => {
    refreshSubscribers.forEach((callback) => callback(token))
    refreshSubscribers = []
}

const addRefreshSubscriber = (callback: any) => {
    refreshSubscribers.push(callback)
}

const removeLSAndRedirect = (errorData: any) => {
    localStorage.removeItem(LocalStorage.accessToken)
    localStorage.removeItem(LocalStorage.refreshToken)
    if (window.location.pathname !== '/login') {
        window.location.replace('/login')
    }
    return Promise.reject(errorData)
}

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const accessToken = localStorage.getItem(LocalStorage.accessToken)
    if (accessToken) {
        config.headers.set('Authorization', `Bearer ${accessToken}`)
    }
    return config
})

api.interceptors.response.use(
    (config) => config,
    async (error) => {
        const originalRequest = error.config
        if (error.response?.data.statusCode === 401) {
            const refreshTokenUser = localStorage.getItem(
                LocalStorage.refreshToken
            )

            if (!refreshTokenUser)
                return removeLSAndRedirect(error.response?.data)

            if (!isRefreshFetching) {
                isRefreshFetching = true
                const res = await fetch(`${API_URL}/pathToRefreshToken`, {
                    headers: new Headers({
                        Authorization: `Bearer ${localStorage.getItem(
                            LocalStorage.refreshToken
                        )}`,
                    }),
                    method: 'post',
                })
                if (res.ok) {
                    const data = (await res.json()) as RefreshToken
                    localStorage.setItem(
                        LocalStorage.accessToken,
                        data.accessToken
                    )
                    localStorage.setItem(
                        LocalStorage.refreshToken,
                        data.refreshToken
                    )
                    isRefreshFetching = false
                    onRefreshed(data.accessToken)
                    return api(originalRequest)
                }
                return removeLSAndRedirect(error.response?.data)
            }
            return new Promise((resolve) => {
                addRefreshSubscriber((newAccessToken: string) => {
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
                    resolve(api(originalRequest))
                })
            })
        }

        return Promise.reject(error.response?.data)
    }
)

export default api
