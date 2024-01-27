import { DesktopOnly, MobileOnly } from "../../Utils/IsMobile";
import LayoutDesktop from "./LayoutDesktop";
import LayoutMobile from "./LayoutMobile";

export default function Layout() {
    return (
        <>
            <MobileOnly>
                <LayoutMobile />
            </MobileOnly>
            <DesktopOnly>
                <LayoutDesktop />
            </DesktopOnly>
        </>
    )
}