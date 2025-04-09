import logo from "@/public/images/logo.png";
import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href={"/"} className="my-10">
      <Image src={logo} width={0} height={150} alt={"logo"} />
    </Link>
  );
}
