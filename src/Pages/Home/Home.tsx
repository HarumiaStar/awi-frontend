import { DesktopOnly, MobileOnly } from "../../Utils/IsMobile";
import HomeMobile from "./HomeMobile";

export default function Home() {
    return (
        <>
        <MobileOnly>
            <HomeMobile />
        </MobileOnly>
        <DesktopOnly>
            <h1>Home Desktop</h1>
        </DesktopOnly>
        </>
    )
}