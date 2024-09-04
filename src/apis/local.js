import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:9400/api/v1", //for the localhost
  //baseURL: "https://api.daleko.com.ng/api/v1", // for production
});
