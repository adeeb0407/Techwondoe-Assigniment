import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
export const API = axios.create({ baseURL: 'http://localhost:8001' });

API.interceptors.request.use((req: any) => {
    if (cookies.get('user_info')) {
      req.headers.Authorization = `Bearer ${cookies.get('user_info')?.token}`;
    }
    return req;
});
console.log(cookies.get('user_info')?.token)

export const loginUser = (username: String, password: String) => API.post('/login', {username : username, password : password});
export const createReview = (user_id: Number, title: String, rating:any, streamingApps : any, reviewDescription : String, banner :any) => API.post('/createreview',{user_id, title, rating, streamingApps, reviewDescription, banner});
export const updateReview = (review_id: Number, title: String, rating:any, streamingApps : any, reviewDescription : String, banner :any) => API.patch('/updateReview', {review_id, title, rating, streamingApps, reviewDescription});
export const myReviews = (user_id: Number) => API.get(`/reviews/${user_id}`);
export const viewReview = (review_id: Number) => API.get(`/reviewsingle/${review_id}`);
export const deleteReview = (review_id: Number) => API.delete(`/deletereview/${review_id}`);
