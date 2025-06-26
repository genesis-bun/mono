import Navbar from "@/src/lib/components/app/Navbar";
import Sidebar from "@/src/lib/components/app/Sidebar";
import ThemeSwitch from "@/src/lib/components/custom/ThemeSwitch";

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-background [--navbar-height:4rem] sm:[--sidebar-width:12rem] overflow-auto">
      <Navbar />
      <Sidebar />

      <div className="mt-[calc(var(--navbar-height))] ml-[var(--sidebar-width)] h-[calc(100dvh-var(--navbar-height))] @container/main">
        {children}
      </div>

      <div className="fixed bottom-4 right-4">
        <ThemeSwitch />
      </div>
    </div>
  )
}