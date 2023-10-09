import { Blog } from './types';

export const getAllBlogs = async (): Promise<Blog[]> => {
  const res = await fetch('http://localhost:5000/blogs');
  const blogs = res.json();

  return blogs;
}