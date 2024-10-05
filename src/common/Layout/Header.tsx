import Container from "./Container";
import SessionedHeader from "./SessionedHeader";
import Link from "next/link";
import LogoSvg from "../Atoms/Image/Logo";

export default async function Header() {
  return (
    <header className="fixed top-0 w-full bg-white z-header border-b border-b-line-normal">
      <Container>
        <div className="h-16 flex items-center justify-between">
          <div
            data-name="header__left-side"
            className="flex gap-14 lg:gap-20 items-center"
          >
            <h1>
              <Link href={"/"}>
                <LogoSvg />
              </Link>
            </h1>
            <nav>
              <ul className="flex gap-9 lg:gap-12">
                <li>
                  <Link href={"/study"}>스터디</Link>
                </li>
                <li>
                  <Link href={"/post"}>커뮤니티</Link>
                </li>
              </ul>
            </nav>
          </div>
          <SessionedHeader />
        </div>
      </Container>
    </header>
  );
}
