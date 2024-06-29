import RequestHttp from "./http";

const URL = "http://127.0.0.1:3000/api";
const config = {
  // 默认地址
  baseURL: URL,
  // 设置超时时间
  timeout: 20 * 1000,
  // 跨域时候允许携带凭证
  withCredentials: false
};

const axios = new RequestHttp(config);

export const GET = axios.get;
export const POST = axios.post;
export const PUT = axios.put;
export const DELETE = axios.delete;

export default axios;
