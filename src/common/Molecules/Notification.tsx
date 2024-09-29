import clsx from "clsx";
import toast, { Toast } from "react-hot-toast";

const STATUS_ICON = {
  success: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15 10L11 14L9 12M7.33173 3.9375L3.9375 7.33173L3.93442 7.33462C3.59057 7.67847 3.41824 7.85081 3.29492 8.05204C3.18526 8.23098 3.10425 8.4263 3.05526 8.63037C3 8.86055 3 9.10506 3 9.59424V14.4058C3 14.8949 3 15.1395 3.05526 15.3697C3.10425 15.5738 3.18526 15.7688 3.29492 15.9478C3.41857 16.1495 3.59182 16.3228 3.9375 16.6685L7.33173 20.0627C7.67763 20.4086 7.85021 20.5812 8.05204 20.7048C8.23099 20.8145 8.42581 20.8958 8.62988 20.9448C8.85971 21 9.10382 21 9.59151 21H14.4075C14.8952 21 15.1404 21 15.3702 20.9448C15.5743 20.8958 15.7693 20.8145 15.9482 20.7049C16.1501 20.5812 16.323 20.4086 16.6689 20.0627L20.0632 16.6685C20.4091 16.3226 20.5817 16.1496 20.7053 15.9478C20.815 15.7688 20.8953 15.5738 20.9443 15.3697C20.9996 15.1395 21 14.895 21 14.4058V9.59424C21 9.10506 20.9996 8.86055 20.9443 8.63037C20.8953 8.4263 20.815 8.23099 20.7053 8.05205C20.5817 7.85022 20.4091 7.67761 20.0632 7.33173L16.6689 3.9375C16.3233 3.59181 16.15 3.41857 15.9482 3.29492C15.7693 3.18526 15.5743 3.10425 15.3702 3.05526C15.14 3 14.8945 3 14.4053 3H9.59375C9.10457 3 8.86006 3 8.62988 3.05526C8.42581 3.10425 8.23099 3.18526 8.05204 3.29492C7.85204 3.41748 7.68106 3.58847 7.3414 3.92813L7.33173 3.9375Z"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  loading: (
    <svg
      height="30px"
      width="30px"
      viewBox="0 -960 960 960"
      fill="#e8eaed"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-155.5t86-127Q252-817 325-848.5T480-880q17 0 28.5 11.5T520-840q0 17-11.5 28.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-17 11.5-28.5T840-520q17 0 28.5 11.5T880-480q0 82-31.5 155t-86 127.5q-54.5 54.5-127 86T480-80Z" />
    </svg>
  ),
  warn: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 9.00006V13.0001M4.37891 15.1999C3.46947 16.775 3.01489 17.5629 3.08281 18.2092C3.14206 18.7729 3.43792 19.2851 3.89648 19.6182C4.42204 20.0001 5.3309 20.0001 7.14853 20.0001H16.8515C18.6691 20.0001 19.5778 20.0001 20.1034 19.6182C20.5619 19.2851 20.8579 18.7729 20.9172 18.2092C20.9851 17.5629 20.5307 16.775 19.6212 15.1999L14.7715 6.79986C13.8621 5.22468 13.4071 4.43722 12.8135 4.17291C12.2957 3.94236 11.704 3.94236 11.1862 4.17291C10.5928 4.43711 10.1381 5.22458 9.22946 6.79845L4.37891 15.1999ZM12.0508 16.0001V16.1001L11.9502 16.1003V16.0001H12.0508Z"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  error: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.75 5.75L18.25 18.25M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
};

export default function Notification(props: {
  t: Toast;
  status?: "default" | "success" | "warn" | "error" | "loading";
  message?: { title?: string; text?: string };
}) {
  const { t, status = "default", message = {} } = props;
  const statusColor = {
    success: "bg-status-positive",
    warn: "bg-status-caution",
    error: "bg-status-danger",
  };

  const canClose = true;
  return (
    <div
      className={`${
        t.visible ? "animate-slidein" : "animate-leave"
      } max-w-md w-full bg-black/70 text-white shadow-strong rounded-lg pointer-events-auto flex backdrop-blur-[2px]`}
    >
      <div className="flex-1 w-0 p-4">
        <div
          className={`flex items-start ${
            (status === "error" ||
              status === "success" ||
              status === "loading") &&
            "items-center"
          }`}
        >
          {status !== "default" && (
            <div className="flex-shrink-0 pt-0.5">
              <div
                className={clsx(
                  "flex items-center justify-center h-10 w-10 rounded-full",
                  status === "loading"
                    ? "bg-transparent animate-spin"
                    : statusColor[status]
                )}
              >
                {STATUS_ICON[status]}
              </div>
            </div>
          )}
          <div
            className={`ml-3 flex gap-1 ${
              message?.text ? "flex-col" : "w-full justify-center flex-row"
            }`}
          >
            {message?.title && (
              <p className="text-label-600 text-white text-center">
                {message.title}
              </p>
            )}
            {message?.text && (
              <p className="text-label-400 text-label-alt">{message.text}</p>
            )}
          </div>
        </div>
      </div>
      {canClose && (
        <div className="flex border-l border-black">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-main-300 hover:bg-black focus:outline-none focus:outline-2 focus:outline-main-500"
          >
            닫기
          </button>
        </div>
      )}
    </div>
  );
}
