import { NextPage } from "next";
import { createSupabaseClient } from "../_utils/supabase";
import Link from "next/link";

type Book = {
  id: number;
  title: string;
};

const Page: NextPage = async () => {
  const supabase = createSupabaseClient();
  const { data: books, error } = await supabase.from("book").select("*");
  if (!books || error) {
    console.error(error);
    throw new Error();
  }

  return (
    <>
      <div className="p-6 flex flex-col gap-4 h-screen">
        <p className="text-xl font-bold">My card books</p>
        <div className="flex gap-4 flex-wrap flex-1">
          {books?.map((book) => (
            <div key={book.id} className="w-36 h-48 bg-slate-800 ">
              <Link href={`/books/${book.id}`} className="w-full h-full">
                <div className="w-full h-full flex justify-center items-center">
                  <p>{book.title}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <Link href="/analytics">
          <p>Analytics</p>
        </Link>
      </div>
    </>
  );
};
export default Page;
