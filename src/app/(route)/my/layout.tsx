import SidebarAsideContentArea from "@/common/Layout/Sidebar/SidebarAsideContentArea";
import SidebarNavArea from "@/common/Layout/Sidebar/SidebarNavArea";
import { TProps } from "@/types/component/props";
import MyPageSidebarNavs from "./_components/MyPageSidebarNavs";

export default async function layout({ children }: TProps) {
  return (
    <>
      <SidebarAsideContentArea>
        <SidebarNavArea>
          <MyPageSidebarNavs />
        </SidebarNavArea>
        <section>{children}</section>
      </SidebarAsideContentArea>
    </>
  );
}
