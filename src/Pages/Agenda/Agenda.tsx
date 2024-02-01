import { DesktopOnly, MobileOnly } from "../../Utils/IsMobile"
import Agenda_mobile from "./Agenda_mobile"
import { Liste_agenda } from "./Classes/Liste_Agenda";
import { DefaultCreneaux } from "../../Utils/Types";
import Agenda_Desktop from "./Agenda_desktop";
import { Activite_Agenda } from "./Classes/Activite_Agenda";
import SmallDate from "../../Utils/Types/SmallDate";



export default function Agenda() {

    const agenda: Liste_agenda = new Liste_agenda();

    agenda.addActiviteMap("Animation jeux", new Map<DefaultCreneaux, number>([
        [DefaultCreneaux.MATIN, 0.5],
        [DefaultCreneaux.MIDI, 0.7],
        [DefaultCreneaux.APRES_MIDI, 0.3],
        [DefaultCreneaux.SOIREE, 0.8],
        [DefaultCreneaux.DEPART, 0.2]
    ]));

    agenda.addActiviteMap("Accueil", new Map<DefaultCreneaux, number>([
        [DefaultCreneaux.MATIN, 1],
        [DefaultCreneaux.MIDI, 0.9],
        [DefaultCreneaux.APRES_MIDI, 0.2],
        [DefaultCreneaux.SOIREE, 0.55],
        [DefaultCreneaux.DEPART, 0.1]
    ]));

    agenda.addActiviteMap("Vente restauration", new Map<DefaultCreneaux, number>([
        [DefaultCreneaux.MATIN, 0.2],
        [DefaultCreneaux.MIDI, 0.7],
        [DefaultCreneaux.APRES_MIDI, 0.3],
        [DefaultCreneaux.SOIREE, 0.8],
        [DefaultCreneaux.DEPART, 0.2]
    ]));

    agenda.addActiviteMap("Cuisine", new Map<DefaultCreneaux, number>([
        [DefaultCreneaux.MATIN, 0.5],
        [DefaultCreneaux.MIDI, 1],
        [DefaultCreneaux.APRES_MIDI, 0.3],
        [DefaultCreneaux.SOIREE, 0.8],
        [DefaultCreneaux.DEPART, 0]
    ]));

    agenda.addActiviteMap("Tombola", new Map<DefaultCreneaux, number>([
        [DefaultCreneaux.MATIN, 0.5],
        [DefaultCreneaux.MIDI, 1],
        [DefaultCreneaux.APRES_MIDI, 0.3],
        [DefaultCreneaux.SOIREE, 1],
        [DefaultCreneaux.DEPART, 0.2]
    ]));

    agenda.addActiviteMap("Forum associations", new Map<DefaultCreneaux, number>([
        [DefaultCreneaux.MATIN, 1],
        [DefaultCreneaux.MIDI, 1],
        [DefaultCreneaux.APRES_MIDI, 1],
        [DefaultCreneaux.SOIREE, 0.8],
        [DefaultCreneaux.DEPART, 0.2]
    ]));

    const activite = new Activite_Agenda("Animation jeux", new Map<DefaultCreneaux, number>([
        [DefaultCreneaux.MATIN, 0.5],
        [DefaultCreneaux.MIDI, 0.7],
        [DefaultCreneaux.APRES_MIDI, 0.3],
        [DefaultCreneaux.SOIREE, 0.8],
        [DefaultCreneaux.DEPART, 0.2]
    ]), new SmallDate(11,10,2010));

    agenda.addActivite(activite);

    return <>
        <MobileOnly>
            <Agenda_mobile agenda={agenda} />
        </MobileOnly>
        <DesktopOnly>
            <Agenda_Desktop agenda={agenda} />
        </DesktopOnly>
    </>
}