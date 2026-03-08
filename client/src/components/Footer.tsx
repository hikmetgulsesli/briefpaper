export default function Footer() {
  return (
    <footer className="border-t py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 BriefPaper. Tüm hakları saklıdır.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="/about" className="hover:text-foreground">Hakkında</a>
            <a href="/terms" className="hover:text-foreground">Kullanım Şartları</a>
            <a href="/privacy" className="hover:text-foreground">Gizlilik</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
