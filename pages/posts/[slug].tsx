import { useRouter } from "next/router";
import markdownToHtml from "@lib/markdownToHtml";
import { getPostBySlug, getAllPosts } from "@lib/api";

const PostPage = ({ post }) => {
  const router = useRouter();
  return router.isFallback ? <div>LOADING</div> : <div>{post.title}</div>;
};

export default PostPage;

export async function getStaticProps({ params }) {
  const { date, ...post } = getPostBySlug(params.slug, [
    "title",
    "date",
    "slug",
    "author",
    "content",
    "ogImage",
    "coverImage",
  ]);

  const content = await markdownToHtml(post.content || "");

  return {
    props: {
      post: {
        ...post,
        date: date.toString(),
        content,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug"]);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}
