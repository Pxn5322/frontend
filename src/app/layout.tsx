import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/contexts/AuthContext";
import { TicketProvider } from "@/features/tickets/context/TicketContext";
import { KnowledgeProvider } from "@/contexts/KnowledgeContext";
import { Toaster } from "react-hot-toast";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import { CompanyProvider } from "@/features/tenants/context/CompanyProvider";
import { PlatformUserProvider } from "@/features/platformUsers/context/PlatformUserProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: 'Enterprise Nexus',
  description: 'AI-Native Multi-Tenant Support Ticketing Platform',
  icons: {
    icon: "./favicon.svg",
  },
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en" className={inter.variable} data-scroll-behavior="smooth" data-bs-theme="dark">
      <body>
        <div className="globalAmbientCanvas">
          <div className="globalMatrixGrid" />
        </div>
        <AuthProvider>
          <TicketProvider>
            <KnowledgeProvider>
              <CompanyProvider>
                <PlatformUserProvider>
                  <div className="appViewportContainer">
                    {children}
                  </div>
                </PlatformUserProvider>
              </CompanyProvider>
              <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
            </KnowledgeProvider>
          </TicketProvider>
        </AuthProvider>
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
          async
        />
      </body>
    </html>
  );
}