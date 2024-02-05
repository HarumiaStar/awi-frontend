import { useReducer } from "react";
import { DesktopOnly, MobileOnly } from "../../Utils/IsMobile";
import LayoutDesktop from "./LayoutDesktop";
import LayoutMobile from "./LayoutMobile";
import { setReloadLayout } from "../../Utils/Types/Database/Auth";

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