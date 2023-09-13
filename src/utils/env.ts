const API_URL_DEV = 'http://gofast-api.onrender.com';
const API_URL_LOCAL = 'http://localhost:4000';
export const APP_ENV = 'local' as string;
export const API_URL = APP_ENV === 'local' ? API_URL_LOCAL : API_URL_DEV;
export const GOOGLE_MAPS_APIKEY = 'AIzaSyCCqm6B_WNT1UxOjt0InsHocTxT9QjgeAc';
