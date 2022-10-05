import { NextPage } from "next";
import { Key, useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../utils/supabase";
import Video from "react-player";
type Lesson = {
  id: Key | null;
  title: String;
  description: String;
};
interface Props {
  lesson: Lesson;
}
const LessonDetail: NextPage<Props> = ({ lesson }: Props) => {
  const [videoUrl, setVideoUrl] = useState("");

  useEffect(() => {
    getPremiumContent();
  }, []);

  const getPremiumContent = async () => {
    const { data } = await supabase
      .from("premium_content")
      .select("*")
      .eq("id", lesson.id)
      .single();
    setVideoUrl(data?.video_url);
  };
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <div className="p-8 h-50 mb-4 max-w-md rounded shadow text-xl">
        <h1 className="text-3xl pb-2 font-bold">Lesson Details</h1>
        <p className="mb-3">{lesson.description}</p>
        {videoUrl ? (
          <Video url={videoUrl} width="100%" />
        ) : (
          <p className="mb-5 text-red-700">User not subscribed</p>
        )}
        <Link href="/">
          <a className="font-bold underline decoration-indigo-500 hover:decoration-blue-400">
            Return Home
          </a>
        </Link>
      </div>
    </div>
  );
};

export const getStaticPaths = async () => {
  const { data: lessons } = await supabase.from("lesson").select("*");
  const paths = lessons?.map(({ id }) => ({
    params: {
      id: id.toString(),
    },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: any) => {
  const { data: lesson } = await supabase
    .from("lesson")
    .select("*")
    .eq("id", params.id)
    .single();
  return {
    props: {
      lesson,
    },
  };
};

export default LessonDetail;
