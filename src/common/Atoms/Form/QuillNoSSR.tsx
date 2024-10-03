"use client";

import dynamic from "next/dynamic";
import ReactQuill, { ReactQuillProps } from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./customQuill.css";
import clsx from "clsx";

const modules = {
  toolbar: [
    [/* "image", */ "link"],
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [
      { align: "justify" },
      { align: "" },
      { align: "center" },
      { align: "right" },
    ],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};

const formats = [
  "header",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "link",
  "image",
  "align",
  "list",
  "indent",
];

// QuillNoSSR.defaultProps = {
//   theme: "snow",
//   modules,
//   formats,
//   bounds: ".editor",
// };

type TForwardedQuillComponent = ReactQuillProps & {
  forwardedRef: React.Ref<ReactQuill>;
  theme?: string;
  modules?: object;
  formats?: string[];
  bounds?: string | HTMLElement;
};

const QuillNoSSR = dynamic(
  async () => {
    const { default: QuillComponent } = await import("react-quill");
    const icons = QuillComponent.Quill.import("ui/icons");
    //     icons[
    //       "image"
    //     ] = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    // <path d="M3.00005 18.0001C3 17.9355 3 17.8689 3 17.8002V6.2002C3 5.08009 3 4.51962 3.21799 4.0918C3.40973 3.71547 3.71547 3.40973 4.0918 3.21799C4.51962 3 5.08009 3 6.2002 3H17.8002C18.9203 3 19.4801 3 19.9079 3.21799C20.2842 3.40973 20.5905 3.71547 20.7822 4.0918C21 4.5192 21 5.07899 21 6.19691V17.8031C21 18.2881 21 18.6679 20.9822 18.9774M3.00005 18.0001C3.00082 18.9884 3.01337 19.5058 3.21799 19.9074C3.40973 20.2837 3.71547 20.5905 4.0918 20.7822C4.5192 21 5.07899 21 6.19691 21H17.8036C18.9215 21 19.4805 21 19.9079 20.7822C20.2842 20.5905 20.5905 20.2837 20.7822 19.9074C20.9055 19.6654 20.959 19.3813 20.9822 18.9774M3.00005 18.0001L7.76798 12.4375L7.76939 12.436C8.19227 11.9426 8.40406 11.6955 8.65527 11.6064C8.87594 11.5282 9.11686 11.53 9.33643 11.6113C9.58664 11.704 9.79506 11.9539 10.2119 12.4541L12.8831 15.6595C13.269 16.1226 13.463 16.3554 13.6986 16.4489C13.9065 16.5313 14.1357 16.5406 14.3501 16.4773C14.5942 16.4053 14.8091 16.1904 15.2388 15.7607L15.7358 15.2637C16.1733 14.8262 16.3921 14.6076 16.6397 14.5361C16.8571 14.4734 17.0896 14.4869 17.2988 14.5732C17.537 14.6716 17.7302 14.9124 18.1167 15.3955L20.9822 18.9774M20.9822 18.9774L21 18.9996M15 9C14.4477 9 14 8.55228 14 8C14 7.44772 14.4477 7 15 7C15.5523 7 16 7.44772 16 8C16 8.55228 15.5523 9 15 9Z" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
    // </svg>
    // `;
    icons[
      "link"
    ] = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.53564 11.4647L11.4299 4.5704C13.4802 2.52015 16.8044 2.52015 18.8546 4.5704C20.9049 6.62066 20.9046 9.94496 18.8544 11.9952L10.8994 19.9502C9.53258 21.317 7.31688 21.3168 5.95004 19.95C4.58321 18.5831 4.58287 16.3673 5.94971 15.0005L13.9047 7.0455C14.5881 6.36208 15.6967 6.36208 16.3801 7.0455C17.0635 7.72892 17.0631 8.83669 16.3796 9.52011L9.48535 16.4144" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
`;
    icons[
      "bold"
    ] = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 12H12.5M8 12V5H12.5C14.433 5 16 6.567 16 8.5C16 10.433 14.433 12 12.5 12M8 12V19H13.5C15.433 19 17 17.433 17 15.5C17 13.567 15.433 12 13.5 12H12.5" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
`;
    icons[
      "italic"
    ] = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 19H10M10 19H12M10 19L14 5M12 5H14M14 5H16" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
`;
    icons[
      "underline"
    ] = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6 19H18M8 5V11C8 13.2091 9.79086 15 12 15C14.2091 15 16 13.2091 16 11V5" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
`;
    icons[
      "strike"
    ] = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.0005 12.0001C12.8959 12.0001 13.7749 12.1925 14.5457 12.5571C14.8939 12.7218 15.2146 12.9192 15.5009 13.1437C15.8484 13.4162 16.1457 13.729 16.3822 14.0732C16.8136 14.7009 17.0263 15.4096 16.9982 16.1256C16.97 16.8416 16.702 17.5385 16.2222 18.1433C15.7424 18.7481 15.0684 19.2386 14.2705 19.5638C13.4727 19.889 12.5802 20.0373 11.6865 19.9923C10.7928 19.9473 9.93104 19.7108 9.19043 19.3082C8.44982 18.9055 7.85782 18.3514 7.47656 17.7032M12.0005 12.0001H4M12.0005 12.0001H20M16.5243 6.29718C16.143 5.649 15.5512 5.09462 14.8105 4.69197C14.0699 4.28932 13.2076 4.05287 12.314 4.00789C11.4203 3.96291 10.5278 4.11091 9.72998 4.43613C8.93213 4.76135 8.25812 5.25205 7.77832 5.85689C7.29852 6.46173 7.03057 7.15885 7.00244 7.87485C6.9942 8.08463 7.00669 8.29345 7.03924 8.50014" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
`;
    icons["align"][
      ""
    ] = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4 18H14M4 14H20M4 10H14M4 6H20" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
`;
    icons["align"][
      "center"
    ] = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17 18H7M20 14H4M17 10H7M20 6H4" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
`;
    icons["align"][
      "right"
    ] = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20 18H10M20 14H4M20 10H10M20 6H4" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
`;
    icons["align"][
      "justify"
    ] = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20 18H4M20 14H4M20 10H4M20 6H4" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
`;
    icons["list"][
      "ordered"
    ] = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10 17H20M4 15.6853V15.5C4 14.6716 4.67157 14 5.5 14H5.54054C6.34658 14 7.00021 14.6534 7.00021 15.4595C7.00021 15.8103 6.8862 16.1519 6.67568 16.4326L4 20.0002L7 20M10 12H20M10 7H20M4 5L6 4V10" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
`;
    icons["list"][
      "bullet"
    ] = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9 17H19M9 12H19M9 7H19" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<circle cx="5" cy="7" r="1" fill="black"/><circle cx="5" cy="12" r="1" fill="black"/><circle cx="5" cy="17" r="1" fill="black"/>
</svg>

`;
    icons["indent"][
      "-1"
    ] = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4 17H10M4 12H13M4 7H16" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M19 15L14 15M14 15L17 18M14 15L17 12" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
`;
    icons["indent"][
      "+1"
    ] = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4 17H10M4 12H13M4 7H16" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M12 15L20 15M20 15L17 12M20 15L17 18" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
`;
    const Quill = ({
      forwardedRef,
      className = "",
      theme = "snow",
      modules,
      formats,
      bounds = ".editor",
      ...props
    }: TForwardedQuillComponent) => (
      <QuillComponent
        ref={forwardedRef}
        className={clsx("min-h-20 pb-[72px]", className)}
        theme={theme}
        modules={modules}
        formats={formats}
        bounds={bounds}
        {...props}
      />
    );
    return Quill;
  },
  {
    loading: () => (
      <div className="w-full min-h-[580px] rounded-ten bg-label-disable animate-pulse"></div>
    ),
    ssr: false,
  }
);

export default QuillNoSSR;
