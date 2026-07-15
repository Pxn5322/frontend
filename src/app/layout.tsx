import type { Metadata } from "next";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "react-hot-toast";
import { TicketProvider } from "@/contexts/TicketContext";
import { KnowledgeProvider } from "@/contexts/KnowledgeContext";

export const metadata: Metadata = {
  title: "Enterprise Nexus",
  description: "AI Powered Ticketing System",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en" data-bs-theme="dark">
      <body>
        <AuthProvider>
          <TicketProvider>
            <KnowledgeProvider>
              {children}
              <Toaster position="top-right" />
            </KnowledgeProvider>
          </TicketProvider>
        </AuthProvider>
      </body>
    </html>
  );
}