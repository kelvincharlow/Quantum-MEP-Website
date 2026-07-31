import Link from "next/link";
import Image from "next/image";
import logoImage from "@/app/images/logo.png";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link className={`logo ${light ? "logo--light" : ""}`} href="/" aria-label="Quantum MEP Consultants home">
      <span className="logo__mark" aria-hidden="true">
        <Image src={logoImage} alt="" fill sizes="44px" priority />
      </span>
      <span className="logo__type">
        <strong>Quantum</strong>
        <small>MEP Consultants</small>
      </span>
    </Link>
  );
}
