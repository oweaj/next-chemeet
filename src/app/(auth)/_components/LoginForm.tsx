"use client";

import { FormEvent, useState, useTransition } from "react";
import { Input } from "./UserInput";
import { useRouter } from "next/navigation";
import handleAlert from "@/common/Molecules/handleAlert";
import Image from "next/image";
import { login } from "@/lib/actions/authAction";
import { Google, Kakao, Github } from "@public/icons";
import { signIn } from "next-auth/react";

const socialLoginList = [
  { provider: "kakao", icon: Kakao },
  { provider: "google", icon: Google },
  { provider: "github", icon: Github },
];

export function LoginForm() {
  const router = useRouter();
  const [pwData, setPwData] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    handleAlert("loading", "로그인 중 입니다.");

    try {
      startTransition(async () => {
        const result = await login(formData);
        if (result.state) {
          router.replace("/");
          handleAlert("success", result.message);
        } else {
          setPwData("");
          handleAlert("error", result.message);
        }
      });
    } catch (error) {
      handleAlert("error", "로그인 중 문제가 발생했습니다.");
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col w-full gap-5">
        <Input
          id="email"
          type="email"
          title="이메일"
          placeholder="example@chemeet.com"
          disabled={isPending}
        />
        <Input
          id="password"
          type="password"
          title="비밀번호"
          placeholder="********"
          value={pwData}
          disabled={isPending}
          onChange={(e) => setPwData(e.target.value)}
        />
        <div className="w-full flex flex-col items-center gap-4">
          <button
            className="w-full rounded-md py-2 text-white bg-main-600"
            disabled={isPending}
          >
            로그인
          </button>
          <button
            type="button"
            className="w-full text-center rounded-md py-2 bg-main-25"
            onClick={() => router.push("/register")}
            disabled={isPending}
          >
            회원가입
          </button>
        </div>
      </form>
    </>
  );
}

export function SocialLoginForm() {
  return (
    <div className="flex items-center justify-center gap-4">
      {socialLoginList.map(({ provider, icon }) => (
        <button
          key={provider}
          onClick={() => signIn(provider, { callbackUrl: "/" })}
        >
          <Image src={icon} alt={`${provider} 로그인`} />
        </button>
      ))}
    </div>
  );
}
