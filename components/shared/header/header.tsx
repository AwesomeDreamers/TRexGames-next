import { auth } from "@/auth";
import Link from "next/link";
import UserButton from "./user-button";

export default async function Header() {
  const session = await auth();
  return (
    <header className="sticky top-0 w-full h-16 flex z-10 bg-background">
      <div className="container mx-auto flex justify-between items-center px-5">
        <h1 className="text-xl font-bold">
          <Link href="/">T-REX GAMES</Link>
        </h1>
        <div className="hidden md:block">
          <Link href={"/browse"}>
            <p className="semi-bold underline-offset-4 hover:underline">
              게임목록
            </p>
          </Link>
        </div>
        <div className="flex items-center gap-6">
          <UserButton session={session} />
        </div>
      </div>
    </header>
  );
}
