import React from "react"
import { Jeu, parseNbJoueur, TypeJeu } from "../../../../Utils/Types";
import { IoPeople } from "react-icons/io5";
import { IoMdTimer } from "react-icons/io";

export type AffichageJeuProps = {
    jeu: Jeu;
}

export type AffichageJeuRefType = {

};

export const AffichageJeu = React.forwardRef((props: AffichageJeuProps, ref) => {

    const [open, setOpen] = React.useState(false);


    const nbJoueurs = parseNbJoueur(props.jeu.nbJoueurs)

    const toggleOpen = () => {
        setOpen(!open);
    }


    const createText = (text: string | number | boolean | undefined, title: string) => {
        if (text !== undefined && typeof text === "boolean") {
            text = text ? "Oui" : "Non";
        }

        return (
            <div className="flex flex-row  items-center gap-2">
                <strong>{title}: </strong>
                {text ? text : "Non renseigné"}
            </div>
        )
    }

    const createLink = (text: string | undefined, title: string) => {
        return (
            <div className="flex flex-row items-center gap-2">
                <strong >{title} :</strong>
                {text ? (
                    <a
                        className="text-blue-500 hover:text-blue-700 underline"
                        href={text}
                        target="_blank"
                        rel="noreferrer">
                        Lien
                    </a>
                ) : "Non renseigné"}
            </div>
        )
    }

    return (
        <div
            className="flex flex-col w-full p-2 border border-gray-300 rounded-lg" >
            <div className="flex flex-row justify-between cursor-pointer" onClick={toggleOpen}>
                {props.jeu.nom}
                <div className="flex flex-row">
                    #{props.jeu.idJeu}
                </div>
            </div>
            <div className="flex flex-row justify-between align-middle cursor-pointer" onClick={toggleOpen}>
                <div className="flex flex-row justify-center align-middle items-center gap-2">
                    <IoPeople />
                    {nbJoueurs ? (<p>{nbJoueurs?.item1} - {nbJoueurs?.item2}</p>) : "Non renseigné"}
                </div>
                <div className="flex flex-row justify-center align-middle items-center gap-2">
                    <IoMdTimer />
                    {props.jeu.duree ? `${props.jeu.duree} min` : "Non renseiigné"}
                </div>
            </div>
            {open ? (

                <div className="flex flex-row justify-between border-t-2 border-gray-300 pt-2 mt-2">
                    {/* A afficher : editeur? , ageMin? , type, notice?(lien), zonePlan, zoneBenevole?, idZone, aAnimer, recu, mecanismes?, themes?, tags?, description?, image?, logo?, video? */}
                    <div className="flex flex-col">
                        {createText(props.jeu.editeur, "Editeur")}
                        {createText(props.jeu.ageMin, "Age min")}
                        {createText(props.jeu.type, "Type")}
                        {createLink(props.jeu.notice, "Notice")}
                        {createText(props.jeu.zonePlan, "Zone plan")}
                        {createText(props.jeu.zoneBenevole, "Zone bénévole")}
                        {createText(props.jeu.idZone, "Id zone")}
                        {createText(props.jeu.aAnimer, "A animer")}
                        {createText(props.jeu.recu, "Recu")}
                        {createText(props.jeu.mecanismes, "Mécanismes")}
                        {createText(props.jeu.themes, "Thèmes")}
                        {createText(props.jeu.tags, "Tags")}
                        {createText(props.jeu.description, "Description")}
                        {createLink(props.jeu.image, "Image")}
                        {createLink(props.jeu.logo, "Logo")}
                        {createLink(props.jeu.video, "Video")}
                    </div>
                </div>
            ) : null}
        </div>
    )
});