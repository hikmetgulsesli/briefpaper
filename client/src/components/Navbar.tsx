import { FileText, Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <a href="/" className="flex items-center gap-2 font-bold text-xl">
            <FileText className="w-6 h-6" />
            BriefPaper
          </a>
          
          <div className="hidden md:flex items-center gap-6">
            <a href="/upload" className="text-muted-foreground hover:text-foreground">Yükle</a>
            <a href="/dashboard" className="text-muted-foreground hover:text-foreground">Dashboard</a>
            <a href="/wallet" className="text-muted-foreground hover:text-foreground">Cüzdan</a>
            <a href="/login" className="text-muted-foreground hover:text-foreground">Giriş</a>
          </div>

          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col gap-4">
              <a href="/upload" className="text-muted-foreground hover:text-foreground">Yükle</a>
              <a href="/dashboard" className="text-muted-foreground hover:text-foreground">Dashboard</a>
              <a href="/wallet" className="text-muted-foreground hover:text-foreground">Cüzdan</a>
              <a href="/login" className="text-muted-foreground hover:text-foreground">Giriş</a>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
