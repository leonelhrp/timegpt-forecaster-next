import Link from "next/link";
import Logo from "@/components/Logo";

export function Header() {
  return (
    <header className="px-6 bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto mt-4">
        <Link
          href="/"
        >
          <Logo className="w-2/12 pb-2"/>
        </Link>
      </div>
    </header>
  );
}
