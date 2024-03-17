import { createClient } from "@/prismicio";
import * as prismic from "@prismicio/client";
import { Metadata } from "next";
/**
 * This component renders your homepage.
 *
 * Use Next's generateMetadata function to render page metadata.
 *
 * Use the SliceZone to render the content of the page.
 */
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
