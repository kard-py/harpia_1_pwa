import axios from "axios";

const api = {
  baseUrl: "https://refactored-spoon-qg67754gq94cxrx4-3010.app.github.dev",
  get: async (route: string) => {
    const url = api.baseUrl + route;
    const res = await axios.get(url);
    return res.data;
  },
  post: async (route: string, body: any) => {
    const url = api.baseUrl + route;
    const res = await axios.post(url, body);
    return res.data;
  },
  put: async (route: string, body: any) => {
    const url = api.baseUrl + route;
    const res = await axios.put(url, body);
    return res.data;
  },
  delete: async (route: string) => {
    const url = api.baseUrl + route;
    const res = await axios.delete(url);
    return res.data;
  },
};
export default api;
