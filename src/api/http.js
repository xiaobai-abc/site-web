import axios from "axios";

// 数据返回的接口
const RequestEnums = {
  OVERDUE: 600, // 登录失效
  FAIL: 999, // 请求失败
  SUCCESS: 200 // 请求成功
};

class RequestHttp {
  // 定义成员变量并指定类型
  service;
  constructor(config) {
    // 实例化axios
    this.service = axios.create(config);
    this.service.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token");
        token && (config.headers.Authorization = token);
        return config;
      },
      (error) => {
        // 请求报错
        Promise.reject(error);
      }
    );

    /**
     * 响应拦截器
     * 服务器换返回信息 -> [拦截统一处理] -> 客户端JS获取到信息
     */
    this.service.interceptors.response.use(
      (response) => {
        // console.log(response)
        const { data, config } = response; // 解构
        if (response.status === RequestEnums.OVERDUE) {
          return Promise.reject(data);
        }
        // 全局错误信息拦截（防止下载文件得时候返回数据流，没有code，直接报错）
        if (response.status && response.status !== RequestEnums.SUCCESS) {
          return Promise.reject(data);
        }
        return data;
      },
      (error) => {
        const { response } = error;
        // Notification.error(error.message);
        // console.log(response)
        if (response) {
          return this.handleCode(response.status, response.statusText);
        } else {
          switch (error.code) {
            case "ECONNABORTED":
              Message.error("终止连线~~~");
              break;
            case "ERR_NETWORK":
              Message.error("网络异常~~~");
              break;
          }
        }
        if (!window.navigator.onLine) {
          // router.replace({
          //   path: "/404",
          // });
          return;
        }
      }
    );
  }
  handleCode(code, statusText) {
    switch (code) {
      case 401:
        break;
      case 500:
        // const store = useUserStore();
        // userStore.clearToken();

        return Promise.reject(statusText);
      default:
        break;
    }
  }

  get(url, params, config = {}) {
    return this.service.get(url, {
      params,
      ...config
    });
  }
  post(url, params, config = {}) {
    return this.service.post(url, params, config);
  }
  put(url, params, config = {}) {
    return this.service.put(url, params, config);
  }
  delete(url, params, config = {}) {
    return this.service.delete(url, {
      params,
      ...config
    });
  }
}

// 导出一个实例对象
// export default new RequestHttp(config);
export default RequestHttp;
