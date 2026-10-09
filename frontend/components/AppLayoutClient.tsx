"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { AuthProvider } from "@/lib/auth-context";
import { ThemeProvider, useTheme } from "@/lib/theme-context";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { StudentParentFlowProvider } from "@/lib/student-parent-flow";
import { StudentProfileProvider } from "@/lib/student-profile-context";
import QualificationOnboardingModal from "@/components/QualificationOnboardingModal";

function AppLayoutInner({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const hideSidebar = pathname === "/" || pathname === "/login";
  const isLoginPage = pathname === "/login";
  const { theme } = useTheme();
  const isWhite = theme === "white";

  return (
    <div
      className={`min-h-screen flex ${
        isWhite ? "bg-[#fff8fa] text-purple-950" : "bg-[#0d0614] text-rose-50"
      } antialiased selection:bg-pink-500 selection:text-white transition-colors duration-200`}
    >
      {/* Modern Sidebar (only shown when not on landing page or login page) */}
      {!hideSidebar && (
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      )}

      {/* Main Content Area (offset by sidebar width on desktop only if sidebar is present) */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-200 ${
          !hideSidebar ? "lg:pl-72" : "w-full"
        }`}
      >
        <Header 
          onOpenSidebar={() => setSidebarOpen(true)} 
          isLoginPage={isLoginPage}
          hideSidebar={hideSidebar}
        />
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </main>
        <Footer />
      </div>

      {/* Qualification Customization Modal */}
      <QualificationOnboardingModal />
    </div>
  );
}

export default function AppLayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <StudentParentFlowProvider>
          <StudentProfileProvider>
            <AppLayoutInner>{children}</AppLayoutInner>
          </StudentProfileProvider>
        </StudentParentFlowProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

