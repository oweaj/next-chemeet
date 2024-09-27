import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.NEXT_APP_EMAIL,
    pass: process.env.NEXT_APP_PWD,
  },
});

export const sendEmail = async (email: string, joinEmail?: string) => {
  const check = joinEmail ? "비밀번호" : "이메일";

  const options = {
    from: `"CHEMEET" <${process.env.NEXT_APP_EMAIL}>`,
    to: email,
    subject: "CHEMEET 인증코드",
    html: `
    <div style="font-family:Arial, sans-serif; padding:15px; background-color:#f9f9f9;">
    <h3 style="color: #333;">CHEMEET ${check} 인증</h3>
    <p>아래 링크를 클릭하여 ${check} 찾기를 완료하세요.</p>
    <a href="${process.env.BASE_URL}/find/${
      joinEmail ? "password" : "email"
    }" style="display:inline-block; padding:10px; margin:10px 0; background-color:#007bff; color:white; text-decoration:none; border-radius:5px;">${
      check === "비밀번호"
        ? "비밀번호 변경 링크 이동하기"
        : "이메일 찾기 링크 이동하기"
    } </a>
    <p>※ 입력하신 정보는 10분간 유효하여 유효시간 내에 완료하세요.</p>
    </div>
    `,
  };

  await transporter.sendMail(options);
};
