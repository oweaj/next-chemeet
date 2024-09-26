import Container from "./Container";
import { getSession } from "@/auth";
import SessionedHeader from "./SessionedHeader";
import Link from "next/link";
import LogoSvg from "../Atoms/Image/Logo";

export default async function Header() {
  const session = await getSession();

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
          {session ? (
            <SessionedHeader userId={session.user.id} />
          ) : (
            <Link
              href="/login"
              type="button"
              className="py-2 px-4 border border-solid border-main-600 rounded-[.6rem] text-main-600 font-semibold"
            >
              로그인
            </Link>
          )}
        </div>
      </Container>
    </header>
  );
}
