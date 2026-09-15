import axios from 'axios';
import { Product, Cart, Order } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
});

export const productApi = {
  getProducts: async (params?: any): Promise<Product[]> => {
    const response = await api.get('/products/', { params });
    return response.data;
  },
  getProduct: async (id: string): Promise<Product> => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },
};

export const cartApi = {
  getCart: async (id: string): Promise<Cart> => {
    const response = await api.get(`/carts/${id}`);
    return response.data;
  },
  createCart: async (): Promise<Cart> => {
    const response = await api.post('/carts/');
    return response.data;
  },
};

export const checkoutApi = {
  checkout: async (cartId: string, idempotencyKey: string): Promise<Order> => {
    const response = await api.post(`/carts/${cartId}/checkout`, { idempotency_key: idempotencyKey });
    return response.data;
  },
  pay: async (orderId: string, idempotencyKey: string, outcome: string): Promise<any> => {
    const response = await api.post(`/orders/${orderId}/payments`, { 
      idempotency_key: idempotencyKey,
      mock_outcome: outcome
    });
    return response.data;
  }
};

export const orderApi = {
  getOrders: async (): Promise<Order[]> => {
    const response = await api.get('/orders/');
    return response.data;
  },
  getOrder: async (id: string): Promise<Order> => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },
  cancelOrder: async (id: string): Promise<Order> => {
    const response = await api.post(`/orders/${id}/cancel`);
    return response.data;
  }
};

export default api;
