"use client"

import React, { use } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import { useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { get } from 'http'

const getBlogByID = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/blogs/${id}`);
  const data = await res.json();
  return data.blog;
};

const editBlog = async (title: string | undefined, content: string | undefined, id: string) => {
  const res = await fetch(`http://localhost:3000/api/blogs/${id}`, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, content, id }),
  });
  return res.json();
};

const deleteBlog = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/blogs/${id}`, {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res.json();
};

const EditPost = ({params}: {params: {id: string}}) => {
  const router = useRouter();
  const titleRef = useRef<HTMLInputElement | null>(null);
  const contentRef = useRef<HTMLTextAreaElement | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    toast.loading("Loading...", {id: "1"})
    await editBlog(titleRef.current?.value, contentRef.current?.value,params.id);
    toast.success("success", {id: "1"})
    router.push("/");
    router.refresh();
  };

  const handleDelete = async () => {
    toast.loading("Loading...", {id: "1"})
    await deleteBlog(params.id);
    router.push("/");
    router.refresh();
  }

  useEffect(() => {
    getBlogByID(params.id).then((data) => {
      if(titleRef.current && contentRef.current) {
        titleRef.current.value = data.title;
        contentRef.current.value = data.content;
      }
    })
    .catch((err) => {
      toast.error("error", {id: "1"});
    })
  },[]);

  return (
    <>
    <Toaster />
    <div className="w-full m-auto flex my-4">
      <div className="flex flex-col justify-center items-center m-auto">
        <p className="text-2xl text-slate-200 font-bold p-3">ブログの編集 🚀</p>
        <form onSubmit={handleSubmit}>
          <input
            ref={titleRef}
            placeholder="タイトルを入力"
            type="text"
            className="rounded-md px-4 w-full py-2 my-2"
          />
          <textarea
            ref={contentRef}
            placeholder="記事詳細を入力"
            className="rounded-md px-4 py-2 w-full my-2"
          ></textarea>
          <button className="font-semibold px-4 py-2 shadow-xl bg-slate-200 rounded-lg m-auto hover:bg-slate-100">
            更新
          </button>
          <button onClick={handleDelete} className="ml-2 font-semibold px-4 py-2 shadow-xl bg-red-400 rounded-lg m-auto hover:bg-slate-100">
            削除
          </button>
        </form>
      </div>
    </div>
  </>
  )
}

export default EditPost
