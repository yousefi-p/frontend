import type { Metadata } from "next";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { AuthProvider } from "@/context/AuthContext";


export const metadata: Metadata = {
  title: "باشگاه تنیس ام کلاب",
  description: "اپلیکیشن باشگاه تنیس ام کلاب",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa">
      <body>
        <AuthProvider>
          <Header />
          {children}
          <Footer />
        </AuthProvider>
        <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossOrigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/js/bootstrap.min.js" integrity="sha384-7qAoOXltbVP82dhxHAUje59V5r2YsVfBafyUDxEdApLPmcdhBPg1DKg1ERo0BZlK" crossOrigin="anonymous"></script>

      </body>
    </html>
  );
}
