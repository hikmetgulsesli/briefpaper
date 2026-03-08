export default function Landing() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          BriefPaper
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Akademik makalelerinizi AI ile özetleyin, TTS videolar oluşturun.
        </p>
        <div className="flex gap-4 justify-center">
          <a href="/upload" className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90">
            PDF Yükle
          </a>
          <a href="/pricing" className="border border-input px-6 py-3 rounded-lg font-medium hover:bg-accent">
            Fiyatlandırma
          </a>
        </div>
      </div>
    </div>
  )
}
