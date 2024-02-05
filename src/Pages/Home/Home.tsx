import { DesktopOnly, MobileOnly } from "../../Utils/IsMobile";
import HomeDesktop from "./HomeDesktop";
import HomeMobile from "./HomeMobile";

export default function Home() {
    return (
        <>
        <MobileOnly>
            <HomeMobile />
        </MobileOnly>
        <DesktopOnly>
            <HomeDesktop />
        </DesktopOnly>
        </>
    )
}