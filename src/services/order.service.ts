import { environment } from "../constants/environment"
import type { IOrder, IStatus } from "../types/order";
import fetchAPI from "../utils/fetch";
import { getOrderCartItem } from "../utils/ordercart";
import { getLocalStorage } from "../utils/storage";

export const getOrders = async () => {
    let url = `${environment.API_URL}/orders?page=1&pageSize=5`;

    const result = await fetchAPI(url, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${getLocalStorage('auth')}`,
        }
    }).then((data) => data)

    return result
}

export const getDetailOrder = async (id: string) => {
    let url = `${environment.API_URL}/orders/${id}`;

    const result = await fetchAPI(url, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${getLocalStorage('auth')}`,
        }
    }).then((data) => data)

    return result
}

export const updateStatusOrder = async (id: string, status: IStatus) => {
    let url = `${environment.API_URL}/orders/${id}`;

    const result = await fetchAPI(url, {
        method: 'PUT',
        body: JSON.stringify(status),
        headers: {
            Authorization: `Bearer ${getLocalStorage('auth')}`,
        }
    }).then((data) => data)

    return result
}

export const deleteOrderList = async (id: string) => {
    let url = `${environment.API_URL}/orders/${id}`;

    const result = await fetchAPI(url, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${getLocalStorage('auth')}`,
        }
    }).then((data) => data)

    return result
}

export const setOrder = async (payload: IOrder) => {
    let url = `${environment.API_URL}/orders`;

    const result = await fetchAPI(url, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            Authorization: `Bearer ${getLocalStorage('auth')}`,
        }
    })

    return result
}

export const getListOrder = async () => {
    return getOrderCartItem('Cart')
}