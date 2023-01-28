export const BASE_URL = process.env.PUBLIC_URL;

const live = 0;
export const API_URL = live ? "https://mabroor.showtalent.org/api/v1" : "http://localhost:8000/api/v1";
