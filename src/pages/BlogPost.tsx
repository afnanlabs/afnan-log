import { useRef } from "react";
import { ArrowLeft, Bookmark, Share2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useAppStore } from "@/store/app-store";
import { useCursorHover } from "@/hooks/useCursorHover";
import { BLOG_POSTS } from "@/data/blog";

export function BlogPost() {
  const { selectedPostSlug, navigate, bookmarkedPosts, toggleBookmark } =
    useAppStore();
  const backRef = useRef<HTMLButtonElement>(null);
  const bookmarkRef = useRef<HTMLButtonElement>(null);
  const shareRef = useRef<HTMLButtonElement>(null);

  useCursorHover(backRef);
  useCursorHover(bookmarkRef);
  useCursorHover(shareRef);

  const post = BLOG_POSTS.find((p) => p.slug === selectedPostSlug);

  if (!post) {
    return (
      <main className="mx-auto max-w-[680px] px-6 py-28 text-center">
        <p className="font-mono text-sm text-muted-foreground">
          Post not found.
        </p>
        <button
          onClick={() => navigate("blog")}
          className="mt-4 font-mono text-xs text-foreground underline focus-visible:outline-2"
        >
          Back to Blog
        </button>
      </main>
    );
  }

  const sortedPosts = [...BLOG_POSTS].sort(
    (a, b) => new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime(),
  );
  const currentIndex = sortedPosts.findIndex((p) => p.slug === post.slug);
  const prevPost = sortedPosts[currentIndex + 1] ?? null;
  const nextPost = sortedPosts[currentIndex - 1] ?? null;
  const isBookmarked = bookmarkedPosts.includes(post.slug);

  return (
    <main className="mx-auto max-w-[680px] px-6 py-24 pt-24">
      {/* Back nav */}
      <button
        ref={backRef}
        onClick={() => navigate("blog")}
        className="mb-8 mt-4 flex items-center gap-2 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2"
        aria-label="Back to Blog"
      >
        <ArrowLeft className="size-3" />
        Back to Blog
      </button>

      {/* Metadata */}
      <div className="mb-4 flex items-center gap-4">
        <span className="font-mono text-xs tracking-[0.06em] text-muted-foreground">
          {post.date}
        </span>
        <span className="font-mono text-xs text-muted-foreground">
          {post.readingTime} MIN READ
        </span>
        <span className="border border-border px-2 py-0.5 font-mono text-xs text-muted-foreground uppercase tracking-widest">
          {post.category}
        </span>
      </div>

      {/* Title */}
      <h1
        className="mb-6 font-serif text-4xl font-bold leading-[1.15] tracking-tight text-foreground"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        {post.title}
      </h1>

      {/* Author */}
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center border border-border bg-card">
          <span className="font-mono text-xs text-muted-foreground">AK</span>
        </div>
        <div>
          <p className="font-mono text-xs font-semibold tracking-widest text-foreground uppercase">
            Afnan Khan
          </p>
          <p className="font-mono text-xs text-muted-foreground">
            Full Stack Developer
          </p>
        </div>
      </div>

      <Separator className="mb-8" />

      {/* Content */}
      <article
        className="prose-article"
        dangerouslySetInnerHTML={{ __html: post.content }}
        aria-label={post.title}
      />

      <Separator className="my-8" />

      {/* Tags */}
      <div className="mb-6 flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="border border-border px-2.5 py-1 font-mono text-xs text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Actions */}
      <div className="mb-12 flex items-center justify-between">
        <div className="flex gap-3">
          <button
            ref={bookmarkRef}
            onClick={() => toggleBookmark(post.slug)}
            className={`flex items-center gap-2 border px-4 py-2 font-mono text-xs transition-colors focus-visible:outline-2 ${
              isBookmarked
                ? "border-foreground bg-foreground text-background"
                : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
            }`}
            aria-label={isBookmarked ? "Remove bookmark" : "Bookmark post"}
            aria-pressed={isBookmarked}
          >
            <Bookmark className="size-3" />
            {isBookmarked ? "SAVED" : "APPRECIATE"}
          </button>
          <button
            ref={shareRef}
            className="flex items-center gap-2 border border-border px-4 py-2 font-mono text-xs text-muted-foreground transition-colors hover:border-foreground hover:text-foreground focus-visible:outline-2"
            aria-label="Share post"
          >
            <Share2 className="size-3" />
            SHARE
          </button>
        </div>

        <div className="flex gap-4">
          {prevPost && (
            <PostNavButton onClick={() => navigate("blog-post", prevPost.slug)}>
              ← prev
            </PostNavButton>
          )}
          {nextPost && (
            <PostNavButton onClick={() => navigate("blog-post", nextPost.slug)}>
              next →
            </PostNavButton>
          )}
        </div>
      </div>
    </main>
  );
}

function PostNavButton({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  useCursorHover(ref);

  return (
    <button
      ref={ref}
      onClick={onClick}
      className="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2"
    >
      {children}
    </button>
  );
}
