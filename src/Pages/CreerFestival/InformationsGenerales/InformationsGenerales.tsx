import { FaCommentAlt, FaMapMarkerAlt } from "react-icons/fa"
import { Input, PeriodPicker, TextArea } from "../../../Utils/Form"
import { BiRename } from "react-icons/bi"
import { DonneesFestival } from "../DonneesFestival"
import { ChoixCreneauxRef } from "../ChoixCreneaux/ChoixCreneaux"

export type InformationsGeneralesProps = {
    donneesFestival: DonneesFestival;
    choixCreneauxRef: React.RefObject<ChoixCreneauxRef>;
}

export default function InformationsGenerales({ donneesFestival, choixCreneauxRef }: InformationsGeneralesProps) {


    return (
        <div
            className="flex flex-col gap-3 justify-center items-center"
        >
            <h2 className='text-2xl font-bold'>
                Informations générales
            </h2>
            <Input
                type="text"
                placeholder='Nom du festival'
                icon={<BiRename />}
                id="nomFestival"
                onChange={(event) => donneesFestival.nomFestival = event.target.value}
            />
            <PeriodPicker
                onDatesChange={(dates) => {
                    if (dates.dateDebut !== null && dates.dateFin !== null) {
                        donneesFestival.setdates(dates.dateDebut, dates.dateFin);
                        choixCreneauxRef.current?.update();
                    }
                }}
                defaultDateDebut={donneesFestival.dateDebut}
                defaultDateFin={donneesFestival.dateFin} 
            />
            <Input
                type="text"
                placeholder='Lieu du festival'
                icon={<FaMapMarkerAlt />}
                id="lieuFestival"
                onChange={(event) => donneesFestival.lieuFestival = event.target.value}
            />
            <TextArea
                label="Description"
                id="description"
                icon={<FaCommentAlt />}
                onChange={(event) => donneesFestival.description = event.target.value}
            />
            {/* <Input type="text" placeholder='Lien vers le site' icon={<FaCommentAlt />} id="lienSite" />*/}
        </div>
    )
}