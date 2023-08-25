import axios from "axios";

const api = {
  baseUrl: "https://orange-goldfish-67w99x5p69x24pgw-3010.app.github.dev",
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
  delete: async (route: string, body: any) => {
    const url = api.baseUrl + route;
    const res = await axios.delete(url, body);
    return res.data;
  },
};
export default api;
