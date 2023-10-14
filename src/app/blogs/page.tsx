  import { getAllBlogs } from '@/api'
  import Blogs from '../components/Blogs'

  export default async function Blog() {
    const blogs = await getAllBlogs();

    return (
      <main className="flex flex-col items-center bg-blue-500">
        <div className="w-full px-8 py-6 bg-white shadow-md rounded-lg">
          <Blogs blogs={blogs} />
        </div>
      </main>
    )
  }