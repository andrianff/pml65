import { LoginForm } from "@/components/auth/login-form"

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-secondary to-background p-4">
      <div className="w-full max-w-md">
        {/* Header Logo Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground text-lg font-bold">IPB</span>
            </div>
            <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
              <span className="text-accent-foreground text-lg font-bold">STIS</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-primary mb-2">PKL 65</h1>
          <p className="text-muted-foreground">Sistem Pencacah Lapangan</p>
        </div>

        {/* Login Card */}
        <div className="bg-card rounded-lg shadow-lg border border-border p-8">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-2">Masuk</h2>
            <p className="text-sm text-muted-foreground">Masukkan kredensial Anda untuk melanjutkan</p>
          </div>

          <LoginForm />

          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-xs text-center text-muted-foreground">
              Sinergi Data, Pekerja GIG Berdaya, Jogja Istimewa
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
