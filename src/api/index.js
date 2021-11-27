import request from './request';

export default {
  login: (data) => request.post('/wx-login', data),
  getMap: (data) => request.get('/map/get-map-maker', data),
  getBlogs: (data) => request.get('/find-all-blogs', data),
  getBlogTags: (data) => request.get('/find-blog-tags', data),
  getUserBlogs: (data) => request.get('/find-blogs', data),
  delBlog: ({
    _id,
    id
  }) => request.delete(`/del-blog?_id=${_id}&id=${id}`),
}
