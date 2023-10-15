import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { Blog } from '../../../types'

const prisma = new PrismaClient();

//json-serverを使っている場合
export const getAllBlogs = async (): Promise<Blog[]> => {
  const res = await fetch('http://localhost:5000/blogs');
  const blogs = res.json();

  return blogs;
}

export async function main() {
  try {
    await prisma.$connect();
  } catch (err) {
    return "DB接続エラー"
  }
}
//blogsの一覧を取得する
export const GET = async (req: Request, res: NextResponse) => {
  try { //実際に実行する処理
    await main();
    const blogs = await prisma.blog.findMany();
    return NextResponse.json( {message: "Success", blogs}, {status: 200});
  } catch (err) { //エラーが発生した場合の処理
    return NextResponse.json( {message: "Error", err}, {status: 500});
  } finally { //成功・失敗に関わらず実行する処理
    await prisma.$disconnect(); 
  }
}
