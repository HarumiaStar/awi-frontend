import { DesktopOnly, MobileOnly } from "../../Utils/IsMobile";
import LoginDesktop from "./LoginDesktop";
import LoginMobile from "./LoginMobile";

export default function Login() {
    return <>
        <DesktopOnly>
            <LoginDesktop />
        </DesktopOnly>
        <MobileOnly>
            <LoginMobile />
        </MobileOnly>
    </>
}