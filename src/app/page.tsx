import { getAllBlogs } from '@/api'

export default async function Home() {

  return (
    <main className="flex flex-col items-center bg-blue-500">
      <div>
        <h1 className="text-6xl font-bold text-white">Hello, world!</h1>
      </div>
    </main>
  )
}