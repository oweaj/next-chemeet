import Link from "next/link";
import Image from "next/image";
import { SocialLoginLine, Logo } from "@public/icons";
import { LoginForm } from "../_components/LoginForm";
import SocialLogin from "../_components/SocialLogin";
import { GithubLogin, GoogleLogin, KakaoLogin } from "@/lib/actions/authAction";
import { Google, Kakao, Github } from "@public/icons";

const socialLoginList = [
  { action: KakaoLogin, provider: "kakao", icon: Kakao },
  { action: GoogleLogin, provider: "google", icon: Google },
  { action: GithubLogin, provider: "github", icon: Github },
];

export default function Login() {
  return (
    <>
      <Link href={"/"}>
        <Image src={Logo} alt="logo" />
      </Link>
      <LoginForm />
      <div className="flex items-center gap-3 text-sm">
        <Link href="/find">이메일 찾기</Link>
        <span className="w-[1px] h-3 bg-black"></span>
        <Link href="/pw-reset">비밀번호 찾기</Link>
      </div>
      <>
        <Image src={SocialLoginLine} alt="간편 로그인 이미지" />
        <div className="flex items-center justify-center gap-4">
          {socialLoginList.map((item) => (
            <form action={item.action} key={item.provider}>
              <SocialLogin {...item} />
            </form>
          ))}
        </div>
      </>
    </>
  );
}
