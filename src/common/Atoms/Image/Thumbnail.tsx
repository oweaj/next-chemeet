import Image, { ImageProps } from "next/image";
import { DefaultThumbnailImg } from "@public/images";
import clsx from "clsx";

export type TImageThumbnailProps = ImageProps & {
  src: string;
  alt: string;
  useIn?: "default" | "specific" | "linked" | "large";
};

/**
 * @argument useIn default(기본 스터디 리스트의 썸네일), specific(스터디 상세 페이지 썸네일), linked(커뮤니티 관련 스터디 링크 카드 썸네일), wide, large
 */

export default function Thumbnail(props: TImageThumbnailProps) {
  const defaultSize = {
    default: { width: 280, height: 180 },
    specific: { width: 582, height: 438 },
    linked: { width: 200, height: 132 },
    large: { width: 392, height: 448 },
  };
  const {
    alt,
    src,
    useIn = "default",
    width = defaultSize[props.useIn || "default"].width,
    height = defaultSize[props.useIn || "default"].height,
    className,
    ...restProps
  } = props;
  return (
    <Image
      width={width}
      height={height}
      src={src || DefaultThumbnailImg}
      alt={alt}
      className={clsx(
        "thumbnailImage object-cover bg-line-neutral/80",
        className
      )}
      {...restProps}
    />
  );
}
