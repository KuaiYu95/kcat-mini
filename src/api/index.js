import request from './request';

export default {
  login: (data) => request.post('/wx-login', data),
  getBlogs: (data) => request.get('/find-all-blogs', data),
  getBlogTags: (data) => request.get('/find-blog-tags', data),
}
