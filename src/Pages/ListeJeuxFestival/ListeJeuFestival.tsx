import { DesktopOnly, MobileOnly } from "../../Utils/IsMobile";
import ListeJeuFestivalMobile from "./ListeJeuFestivalMobile";

export default function ListJeuFestival() {
    return (<>
        <MobileOnly>
            <ListeJeuFestivalMobile />
        </MobileOnly>
        <DesktopOnly>
            <div>
                Desktop
            </div>
        </DesktopOnly>
    </>
    )
}