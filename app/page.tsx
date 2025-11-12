import { LoginForm } from "@/components/auth/login-form"
import Image from "next/image"

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center relative overflow-hidden p-6">
      
      {/* 🔹 Lapisan 2: Gambar background_login semi transparan */}
      <Image
        src="/pkl/background-login.png"
        alt="Background Login"
        fill
        priority
        className="object-cover opacity-60 mix-blend-multiply"
      />

      {/* 🔹 Frame tepi */}
      <div className="pointer-events-none fixed inset-0 border-[6px] border-[#0c3f4a]" />

      {/* 🔹 Card utama */}
      <div className="w-full max-w-2xl relative z-10">
        <div className="rounded-2xl shadow-[0_12px_35px_rgba(0,0,0,0.15)] overflow-hidden bg-white">
          {/* Header Card: Gradasi + gambar */}
          <div className="relative h-56 flex flex-col items-center justify-center text-center overflow-hidden">
            {/* Lapisan 1: Gradasi oranye */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#ffe08c] via-[#ffd062] to-[#ffb84d]" />

            {/* Lapisan 2: Gambar di atas gradasi */}
            <Image
              src="/pkl/pattern_orange.png" // 🔸 Ganti sesuai gambar header kamu
              alt="Header Background"
              fill
              priority
              className="object-cover opacity-70 mix-blend-multiply"
            />

            {/* Overlay opsional */}
            <div className="absolute inset-0 bg-black/20" />

            {/* Konten header */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="mb-4 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-md border border-white">
                  <Image
                    src="/pkl/LOGO-PKL_REV8.png"
                    alt="Logo PKL"
                    width={80}
                    height={80}
                    className="object-contain"
                  />
                </div>
              </div>
              <h1 className="text-3xl font-bold text-white drop-shadow-md">PKL 65</h1>
              <p className="mt-1 text-base text-white/90 font-medium">
                Sistem Pengawas Lapangan
              </p>
            </div>
          </div>

          {/* Body Card */}
          <div className="p-10">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-foreground mb-3">Selamat Datang PML</h2>
              <p className="text-base text-muted-foreground">
                Silakan login dengan akun PML Anda!
              </p>
            </div>

            <LoginForm />

            <div className="mt-8 pt-8 border-t border-border">
              <p className="text-sm text-center text-muted-foreground">
                Sinergi Data, Pekerja GIG Berdaya, Yogyakarta Istimewa
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
