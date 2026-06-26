import { useMemo, useRef } from 'react'
import { Search, ChevronDown, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { useAppStore } from '@/store/app-store'
import { useCursorHover } from '@/hooks/useCursorHover'
import { BLOG_POSTS, POSTS_PER_PAGE, getFilteredPosts } from '@/data/blog'
import { cn } from '@/lib/utils'

const CATEGORIES = ['All', 'Engineering', 'Design', 'Personal'] as const

export function Blog() {
  const {
    searchQuery,
    activeCategory,
    sortOrder,
    blogCurrentPage,
    navigate,
    setSearchQuery,
    setActiveCategory,
    setSortOrder,
    setBlogCurrentPage,
  } = useAppStore()

  const filteredPosts = useMemo(
    () => getFilteredPosts(BLOG_POSTS, searchQuery, activeCategory, sortOrder),
    [searchQuery, activeCategory, sortOrder]
  )

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
  const currentPosts = filteredPosts.slice(
    (blogCurrentPage - 1) * POSTS_PER_PAGE,
    blogCurrentPage * POSTS_PER_PAGE
  )

  const hasActiveFilters = searchQuery || activeCategory !== 'all'

  return (
    <main className="mx-auto max-w-[680px] px-6 py-24 pt-28">
      {/* Heading */}
      <section className="mb-10">
        <h1
          className="mb-1 font-serif text-5xl font-bold tracking-tight text-foreground"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          Journal.
        </h1>
      </section>

      {/* Controls */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search entries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-9 w-full border border-border bg-background pl-9 pr-3 font-mono text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-foreground focus-visible:outline-none"
            aria-label="Search blog posts"
          />
        </div>

        {/* Sort */}
        <div className="relative">
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as 'newest' | 'oldest')}
            className="h-9 appearance-none border border-border bg-background pr-8 pl-3 font-mono text-sm text-foreground focus-visible:border-foreground focus-visible:outline-none"
            aria-label="Sort order"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-2 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        </div>
      </div>

      {/* Category filters */}
      <div className="mb-8 flex flex-wrap items-center gap-2">
        {CATEGORIES.map((cat) => {
          const value = cat.toLowerCase()
          const isActive = value === 'all' ? activeCategory === 'all' : activeCategory === value
          return (
            <CategoryButton
              key={cat}
              cat={cat}
              isActive={isActive}
              onClick={() => setActiveCategory(value)}
            />
          )
        })}
        {hasActiveFilters && <ClearAllButton onClick={() => {
          setSearchQuery('')
          setActiveCategory('all')
        }} />}
      </div>

      <Separator className="mb-0" />

      {/* Post list */}
      {currentPosts.length > 0 ? (
        <div>
          {currentPosts.map((post) => (
            <article key={post.slug}>
              <PostCard post={post} onClick={() => navigate('blog-post', post.slug)} />
              <Separator />
            </article>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <p className="font-mono text-sm text-muted-foreground">
            No entries found. Try adjusting your filters.
          </p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-between border-t border-border pt-8">
          <PaginationButton
            onClick={() => setBlogCurrentPage(blogCurrentPage - 1)}
            disabled={blogCurrentPage === 1}
            aria-label="Previous page"
          >
            <ChevronLeft className="size-3" />
            PREVIOUS
          </PaginationButton>
          <span className="font-mono text-xs text-muted-foreground">
            PAGE {String(blogCurrentPage).padStart(2, '0')} OF{' '}
            {String(totalPages).padStart(2, '0')}
          </span>
          <PaginationButton
            onClick={() => setBlogCurrentPage(blogCurrentPage + 1)}
            disabled={blogCurrentPage === totalPages}
            aria-label="Next page"
          >
            NEXT
            <ChevronRight className="size-3" />
          </PaginationButton>
        </div>
      )}
    </main>
  )
}

function CategoryButton({
  cat,
  isActive,
  onClick,
}: {
  cat: string
  isActive: boolean
  onClick: () => void
}) {
  const ref = useRef<HTMLButtonElement>(null)
  useCursorHover(ref)

  return (
    <button
      ref={ref}
      onClick={onClick}
      className={cn(
        'border px-3 py-1 font-mono text-xs transition-colors focus-visible:outline-2',
        isActive
          ? 'border-foreground bg-foreground text-background'
          : 'border-border text-muted-foreground hover:border-foreground hover:text-foreground'
      )}
      aria-pressed={isActive}
    >
      {cat}
    </button>
  )
}

function ClearAllButton({ onClick }: { onClick: () => void }) {
  const ref = useRef<HTMLButtonElement>(null)
  useCursorHover(ref)

  return (
    <button
      ref={ref}
      onClick={onClick}
      className="flex items-center gap-1 border border-border px-3 py-1 font-mono text-xs text-muted-foreground transition-colors hover:border-foreground hover:text-foreground focus-visible:outline-2"
    >
      <X className="size-3" />
      CLEAR ALL
    </button>
  )
}

function PostCard({ post, onClick }: { post: (typeof BLOG_POSTS)[0]; onClick: () => void }) {
  const ref = useRef<HTMLButtonElement>(null)
  useCursorHover(ref)

  return (
    <button
      ref={ref}
      onClick={onClick}
      className="group w-full py-8 text-left focus-visible:outline-2"
    >
      <div className="mb-2 flex items-center justify-between">
        <span className="font-mono text-xs tracking-[0.06em] text-muted-foreground">
          {post.date}
        </span>
        <span className="font-mono text-xs tracking-[0.06em] text-muted-foreground">
          {post.readingTime} MIN READ
        </span>
      </div>
      <h2
        className="mb-2 text-2xl font-semibold text-foreground transition-opacity group-hover:opacity-80"
        style={{ fontFamily: 'var(--font-serif)' }}
      >
        {post.title}
      </h2>
      <p
        className="text-sm leading-relaxed text-muted-foreground"
        style={{ fontFamily: 'var(--font-serif)' }}
      >
        {post.excerpt}
      </p>
    </button>
  )
}

function PaginationButton({
  onClick,
  disabled,
  'aria-label': ariaLabel,
  children,
}: {
  onClick: () => void
  disabled: boolean
  'aria-label': string
  children: React.ReactNode
}) {
  const ref = useRef<HTMLButtonElement>(null)
  useCursorHover(ref)

  return (
    <button
      ref={ref}
      onClick={onClick}
      disabled={disabled}
      className="flex items-center gap-2 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground disabled:opacity-30 focus-visible:outline-2"
      aria-label={ariaLabel}
    >
      {children}
    </button>
  )
}
