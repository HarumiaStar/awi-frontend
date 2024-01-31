import { FaCommentAlt, FaMapMarkerAlt } from "react-icons/fa"
import { DatePicker, Input, TextArea } from "../../../Utils/Form"
import { BiRename } from "react-icons/bi"
import React from "react"

const InformationsGenerales = React.forwardRef((props, ref) => {
    return (
        <>
            <h2 className='text-2xl font-bold'>
                Informations générales
            </h2>
            <Input type="text" placeholder='Nom du festival' icon={<BiRename />} id="nomFestival" />
            <DatePicker label="Date de début" id="dateDebut" />
            <DatePicker label="Date de fin" id="dateFin" />
            <Input type="text" placeholder='Lieu du festival' icon={<FaMapMarkerAlt />} id="lieuFestival" />
            <TextArea label="Description" id="description" icon={<FaCommentAlt />} />
            {/* <Input type="text" placeholder='Lien vers le site' icon={<FaCommentAlt />} id="lienSite" />*/}
        </>
    )
});

export default InformationsGenerales