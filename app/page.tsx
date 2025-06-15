import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { ToolsPreview } from "@/components/tools-preview"
import { NewsPreview } from "@/components/news-preview"
import { CreatorSection } from "@/components/creator-section"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-green-400">
      <Hero />
      <Features />
      <CreatorSection />
      <ToolsPreview />
      <NewsPreview />
    </div>
  )
}
