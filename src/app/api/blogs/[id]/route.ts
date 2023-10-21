import { NextResponse } from 'next/server';
import { main } from '../route';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

//blogの詳細記事の取得
export const GET = async (req: Request, res: NextResponse) => {
  try { //実際に実行する処理
    const id: string = req.url.split("/blogs/")[1];
    await main();
    const blog = await prisma.blog.findFirst({ where: { id } });
    return NextResponse.json({ message: "Success", blog }, {status: 200});
  } catch (err) { //エラーが発生した場合の処理
    return NextResponse.json({ message: "Error", err} , {status: 500});
  } finally { //成功・失敗に関わらず実行する処理
    await prisma.$disconnect();
  }
}

//blogの詳細記事の更新
export const PUT = async (req: Request, res: NextResponse) => {
  try { //実際に実行する処理
    const id: string = req.url.split("/blogs/")[1];

    const { title, content } = await req.json();

    await main();
    const blog = await prisma.blog.update({
      data: { title, content },
      where: { id },
    });
    return NextResponse.json({ message: "Success", blog }, {status: 200});
  } catch (err) { //エラーが発生した場合の処理
    return NextResponse.json({ message: "Error",err} , {status: 500});
  } finally { //成功・失敗に関わらず実行する処理
    await prisma.$disconnect();
  }
}

//blogの削除機能
export const DELETE = async (req: Request, res: NextResponse) => {
  try { //実際に実行する処理
    const id: string = req.url.split("/blogs/")[1];

    await main();
    const blog = await prisma.blog.delete({
      where: { id },
    });
    return NextResponse.json({ message: "Success", blog }, {status: 200});
  } catch (err) { //エラーが発生した場合の処理
    return NextResponse.json({ message: "Error",err} , {status: 500});
  } finally { //成功・失敗に関わらず実行する処理
    await prisma.$disconnect();
  }
}
