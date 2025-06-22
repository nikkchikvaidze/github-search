import axios from "axios";

const BASE_URL = "https://api.github.com";

const GITHUBClient = axios.create({
  baseURL: BASE_URL,
});

export { GITHUBClient };
