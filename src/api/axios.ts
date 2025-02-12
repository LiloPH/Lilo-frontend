import axios from "axios";

axios.defaults.baseURL = "http://localhost:2024/api/v1";
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.timeout = 10000;

export default axios;
