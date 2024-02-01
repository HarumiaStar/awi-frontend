import { FaCommentAlt, FaMapMarkerAlt } from "react-icons/fa"
import { Input, PeriodPicker, TextArea } from "../../../Utils/Form"
import { BiRename } from "react-icons/bi"
import { DonneesFestival } from "../DonneesFestival"

export type InformationsGeneralesProps = {
    donneesFestival: DonneesFestival;
}

export default function InformationsGenerales({ donneesFestival }: InformationsGeneralesProps) {
    


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
                    if (dates.dateDebut !== null && dates.dateFin !== null)
                    donneesFestival.dateDebut = dates.dateDebut,
                    donneesFestival.dateFin = dates.dateFin
                }}
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