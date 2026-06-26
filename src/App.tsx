import { useAppStore } from '@/store/app-store'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { CustomCursor } from '@/components/ui/CustomCursor'
import { Home } from '@/pages/Home'
import { Blog } from '@/pages/Blog'
import { BlogPost } from '@/pages/BlogPost'
import { Projects } from '@/pages/Projects'
import { About } from '@/pages/About'

function PageContent() {
  const { currentPage } = useAppStore()

  switch (currentPage) {
    case 'home':
      return <Home />
    case 'blog':
      return <Blog />
    case 'blog-post':
      return <BlogPost />
    case 'projects':
      return <Projects />
    case 'about':
      return <About />
    default:
      return <Home />
  }
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <CustomCursor />
      <Header />
      <div className="flex-1">
        <PageContent />
      </div>
      <Footer />
    </div>
  )
}
