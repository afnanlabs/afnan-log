import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Page = 'home' | 'blog' | 'blog-post' | 'projects' | 'about'
export type CursorState = 'default' | 'hover' | 'hidden'

interface AppStore {
  currentPage: Page
  selectedPostSlug: string | null
  searchQuery: string
  activeCategory: string
  sortOrder: 'newest' | 'oldest'
  blogCurrentPage: number
  bookmarkedPosts: string[]
  cursorState: CursorState
  cursorPosition: { x: number; y: number }

  navigate: (page: Page, slug?: string) => void
  setSearchQuery: (query: string) => void
  setActiveCategory: (category: string) => void
  setSortOrder: (order: 'newest' | 'oldest') => void
  setBlogCurrentPage: (page: number) => void
  toggleBookmark: (slug: string) => void
  setCursorState: (state: CursorState) => void
  setCursorPosition: (x: number, y: number) => void
}

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      currentPage: 'home',
      selectedPostSlug: null,
      searchQuery: '',
      activeCategory: 'all',
      sortOrder: 'newest',
      blogCurrentPage: 1,
      bookmarkedPosts: [],
      cursorState: 'default',
      cursorPosition: { x: 0, y: 0 },

      navigate: (page, slug) =>
        set((state) => ({
          currentPage: page,
          selectedPostSlug: slug ?? null,
          ...(page !== 'blog' && page !== 'blog-post' && state.currentPage !== page
            ? { searchQuery: '', activeCategory: 'all', blogCurrentPage: 1 }
            : {}),
        })),

      setSearchQuery: (query) => set({ searchQuery: query, blogCurrentPage: 1 }),
      setActiveCategory: (category) => set({ activeCategory: category, blogCurrentPage: 1 }),
      setSortOrder: (order) => set({ sortOrder: order }),
      setBlogCurrentPage: (page) => set({ blogCurrentPage: page }),
      toggleBookmark: (slug) =>
        set((state) => ({
          bookmarkedPosts: state.bookmarkedPosts.includes(slug)
            ? state.bookmarkedPosts.filter((s) => s !== slug)
            : [...state.bookmarkedPosts, slug],
        })),
      setCursorState: (cursorState) => set({ cursorState }),
      setCursorPosition: (x, y) => set({ cursorPosition: { x, y } }),
    }),
    {
      name: 'portfolio-store',
      partialize: (state) => ({ bookmarkedPosts: state.bookmarkedPosts }),
    }
  )
)
