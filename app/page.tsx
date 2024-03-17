import { Navigation } from "@/components/navigation";
import { PostCard } from "@/components/post-card";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { SliceZone } from "@prismicio/react";
import * as prismic from "@prismicio/client";
import { Metadata } from "next";
export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const home = await client.getByUID("blog_post", "home");

  return {
    title: prismic.asText(home.data.title),
    description: home.data.meta_description,
    openGraph: {
      title: home.data.meta_title || undefined,
      images: [
        {
          url: home.data.meta_image.url || "",
        },
      ],
    },
  };
}
export default async function Home() {
  const client = createClient();

  // Fetch the content of the home page from Prismic
  const home = await client.getByUID("blog_post", "home");

  // Get all of the blog_post documents created on Prismic ordered by publication date
  const posts = await client.getAllByType("blog_post", {
    orderings: [
      { field: "my.blog_post.publication_date", direction: "desc" },
      { field: "document.first_publication_date", direction: "desc" },
    ],
  });

  return (
    <>
      <Navigation client={client} />

      <SliceZone slices={home.data.slices} components={components} />

      {/* Map over each of the blog posts created and display a `PostCard` for it */}
      <section className="grid grid-cols-1 gap-8 max-w-3xl w-full">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </section>

      <Navigation client={client} />
    </>
  );
}
