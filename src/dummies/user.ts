export function getWriter(userId?: string) {
  return {
    id: userId || "hanyoojun",
    name: "한유준",
    position: "개발자",
    role: "user",
    email: "sumin.yoon@chemeet.com",
    password: "1234",
    profileUrl: "",
    authProviderIn: undefined,
    phone: "010-1234-5678",
    badges: 0,
  };
}

export function getUser(userId?: string) {
  return {
    id: userId || "shinjisoo",
    name: "신지수",
    position: "",
    role: "user",
    email: "shin.jisoo@chemeet.com",
    password: "1234",
    profileUrl: "",
    authProviderIn: undefined,
    phone: "010-1234-5678",
    badges: 8,
  };
}
