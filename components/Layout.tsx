import { Footer } from '@/components/Footer'

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex w-full flex-col">
      <main className="flex-auto">{children}</main>
      <Footer />
    </div>
  )
}
