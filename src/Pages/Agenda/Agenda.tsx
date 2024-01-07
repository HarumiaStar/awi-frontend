import { DesktopOnly, MobileOnly } from "../../Utils/IsMobile"
import Agenda_mobile from "./Agenda_mobile"
import { Liste_agenda } from "./Classes/Liste_Agenda";
import { Creneaux } from "../../Utils/Creneaux";
import Agenda_Desktop from "./Agenda_desktop";



export default function Agenda() {
    const agenda: Liste_agenda = new Liste_agenda();

    agenda.addActiviteMap("Animation jeux", new Map<Creneaux, number>([
        [Creneaux.MATIN, 0.5],
        [Creneaux.MIDI, 0.7],
        [Creneaux.APRES_MIDI, 0.3],
        [Creneaux.SOIREE, 0.8],
        [Creneaux.DEPART, 0.2]
    ]));

    agenda.addActiviteMap("Accueil", new Map<Creneaux, number>([
        [Creneaux.MATIN, 1],
        [Creneaux.MIDI, 0.9],
        [Creneaux.APRES_MIDI, 0.2],
        [Creneaux.SOIREE, 0.55],
        [Creneaux.DEPART, 0.1]
    ]));

    agenda.addActiviteMap("Vente restauration", new Map<Creneaux, number>([
        [Creneaux.MATIN, 0.2],
        [Creneaux.MIDI, 0.7],
        [Creneaux.APRES_MIDI, 0.3],
        [Creneaux.SOIREE, 0.8],
        [Creneaux.DEPART, 0.2]
    ]));

    agenda.addActiviteMap("Cuisine", new Map<Creneaux, number>([
        [Creneaux.MATIN, 0.5],
        [Creneaux.MIDI, 1],
        [Creneaux.APRES_MIDI, 0.3],
        [Creneaux.SOIREE, 0.8],
        [Creneaux.DEPART, 0]
    ]));

    agenda.addActiviteMap("Tombola", new Map<Creneaux, number>([
        [Creneaux.MATIN, 0.5],
        [Creneaux.MIDI, 1],
        [Creneaux.APRES_MIDI, 0.3],
        [Creneaux.SOIREE, 1],
        [Creneaux.DEPART, 0.2]
    ]));

    agenda.addActiviteMap("Forum associations", new Map<Creneaux, number>([
        [Creneaux.MATIN, 1],
        [Creneaux.MIDI, 1],
        [Creneaux.APRES_MIDI, 1],
        [Creneaux.SOIREE, 0.8],
        [Creneaux.DEPART, 0.2]
    ]));

    return <>
        <MobileOnly>
            <Agenda_mobile agenda={agenda} />
        </MobileOnly>
        <DesktopOnly>
            <Agenda_Desktop agenda={agenda} />
        </DesktopOnly>
    </>
}