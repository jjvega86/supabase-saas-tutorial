import type { NextPage } from "next";
import { Key } from "react";

import Link from "next/link";
import { supabase } from "../utils/supabase";

import { useUser } from "../context/user";

type Lesson = {
  id: Key | null;
  title: String;
  description: String;
};

interface Props {
  lessons: Lesson[];
}

const Home: NextPage<Props> = ({ lessons }) => {
  const { user }: any = useUser();
  console.log(user);
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      {lessons.map((lesson: Lesson) => {
        return (
          <Link key={lesson.id} href={`${lesson.id}`}>
            <a className="p-8 h-40 mb-4 max-w-md rounded shadow text-xl flex">
              {lesson.title}
            </a>
          </Link>
        );
      })}
    </div>
  );
};
export const getStaticProps = async () => {
  const { data: lessons } = await supabase.from("lesson").select("*");

  return {
    props: {
      lessons,
    },
  };
};
export default Home;
