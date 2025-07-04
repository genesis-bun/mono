import Navbar from "@/src/lib/components/app/Navbar";
import Sidebar from "@/src/lib/components/app/Sidebar";
import ThemeSwitch from "@/src/lib/components/custom/ThemeSwitch";

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-background [--navbar-height:5rem] sm:[--sidebar-width:0rem]">
      <div className="h-[var(--navbar-height)] border-b-4 border-black">
        <Navbar />
      </div>

      {/* <Sidebar /> */}

      <div className="ml-[var(--sidebar-width)] h-[calc(100dvh-var(--navbar-height))] @container/main">
        {children}
      </div>

      <div className="fixed right-4 bottom-4">
        <ThemeSwitch />
      </div>
    </div>
  )
}