import Icon from "../custom/Icon";
import { Button } from "../ui/button";

export default function Navbar() {
  return (
    <nav className="fixed top-0 gap-2 h-[var(--navbar-height)] w-full z-50 border-b bg-background flex items-center justify-between px-4">
      {/* top left */}
      <div className="flex gap-2 items-center">
        <Icon name="Rabbit" className="size-10" />
      </div>

      {/* top right */}
      <div>
        <Button variant="ghost" size="icon">
          <Icon name="UserCog" className="size-6" />
        </Button>
      </div>
    </nav>
  )
}