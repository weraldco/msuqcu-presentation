import { PathRail, ScrollProgressBar } from './components/PathNav'
import { StackPanel } from './components/StackPanel'
import { HeroSection } from './components/sections/HeroSection'
import { SpeakerSection } from './components/sections/SpeakerSection'
import { ChapterHeading } from './components/sections/ChapterHeading'
import { SubheadingSection } from './components/sections/SubheadingSection'
import { PhotoGallery } from './components/sections/PhotoGallery'
import { QuoteSection } from './components/sections/QuoteSection'
import { ListSection } from './components/sections/ListSection'
import { LessonSection } from './components/sections/LessonSection'
import { FinalSection } from './components/sections/FinalSection'
import { ContactSection } from './components/sections/ContactSection'
import { useClickAdvance } from './hooks/useClickAdvance'
import { deck, type SlideEntry } from './content'

function renderContent(entry: Exclude<SlideEntry, { type: 'gallery' }>) {
  switch (entry.type) {
    case 'title':
      return <HeroSection heading={entry.heading} subtitle={entry.subtitle} />
    case 'speaker':
      return (
        <SpeakerSection photo={entry.photo} name={entry.name} role={entry.role} bio={entry.bio} />
      )
    case 'heading':
      return <ChapterHeading id={entry.id} number={entry.number} heading={entry.heading} />
    case 'subheading':
      return <SubheadingSection heading={entry.heading} />
    case 'quote':
      return <QuoteSection lines={entry.lines} keyMessage={entry.keyMessage} />
    case 'list':
      return <ListSection heading={entry.heading} items={entry.items} quote={entry.quote} />
    case 'lesson':
      return (
        <LessonSection
          number={entry.number}
          title={entry.title}
          quote={entry.quote}
          body={entry.body}
        />
      )
    case 'final':
      return <FinalSection heading={entry.heading} subheading={entry.subheading} />
    case 'contact':
      return <ContactSection heading={entry.heading} qrCode={entry.qrCode} socials={entry.socials} />
  }
}

type PanelItem =
  | { kind: 'gallery'; key: string; images: string[] }
  | { kind: 'panel'; key: string; content: React.ReactNode }

/**
 * Flattens the deck into scroll panels. A quote that carries a keyMessage becomes two
 * panels — the quote lines, then the key message on its own beat — instead of one, so
 * the takeaway lands as its own moment between the story and the next topic.
 */
function buildPanelItems(): PanelItem[] {
  const items: PanelItem[] = []
  deck.forEach((entry, i) => {
    if (entry.type === 'gallery') {
      items.push({ kind: 'gallery', key: `g-${i}`, images: entry.images })
      return
    }
    if (entry.type === 'quote' && entry.keyMessage) {
      items.push({ kind: 'panel', key: `q-${i}-lines`, content: <QuoteSection lines={entry.lines} /> })
      items.push({
        kind: 'panel',
        key: `q-${i}-key`,
        content: <QuoteSection lines={[]} keyMessage={entry.keyMessage} />,
      })
      return
    }
    items.push({ kind: 'panel', key: `p-${i}`, content: renderContent(entry) })
  })
  return items
}

function App() {
  useClickAdvance()
  const items = buildPanelItems()
  let zIndex = 0

  return (
    <div className="relative w-full">
      <ScrollProgressBar />
      <PathRail />
      <main>
        {items.map((item) =>
          item.kind === 'gallery' ? (
            <PhotoGallery key={item.key} images={item.images} />
          ) : (
            <StackPanel key={item.key} zIndex={++zIndex}>
              {item.content}
            </StackPanel>
          ),
        )}
      </main>
    </div>
  )
}

export default App
