import Link from "next/link";
import { notFound } from "next/navigation";
import { client } from "../../../sanity/lib/client";
import { POST_BY_SLUG_QUERY } from "../../../sanity/lib/queries";
import PostGallery from "../../../components/PostGallery";
import AudioBlock from "../../../components/AudioBlock";
import type { Post } from "../../../sanity/lib/types";
import RichText from "../../../components/RichText";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function PostPage({ params }: PageProps) {
  const { id } = await params;

  const post: Post | null = await client.fetch(POST_BY_SLUG_QUERY, {
    slug: id,
  });

  if (!post) {
    notFound();
  }

  const galleryImages =
    post.images
      ?.map((img) => img.asset?.url)
      .filter((url): url is string => Boolean(url)) ?? [];

  return (
    <main className="detail-page">
      <Link href="/" className="back-link">
        ← Zurück zur Übersicht
      </Link>

      <article>
        {galleryImages.length > 0 && (
          <>
            <div className="detail-hero-image-wrap">
              <img
                src={galleryImages[0]}
                alt={`${post.title} 1`}
                className="detail-hero-image"
              />
            </div>

            {galleryImages.length > 1 && (
              <PostGallery
                images={galleryImages.slice(1)}
                title={post.title}
              />
            )}
          </>
        )}

        <h1 className="detail-title">{post.title}</h1>

        <p className="detail-meta">
          {post.location} · {post.date}
        </p>

        {post.audio?.asset?.url && (
          <AudioBlock
            src={post.audio.asset.url}
            title={post.audioTitle}
            transcriptSegments={post.transcriptSegments}
          />
        )}

        <div className="detail-content">
          <RichText value={post.content} />
        </div>
      </article>
    </main>
  );
}