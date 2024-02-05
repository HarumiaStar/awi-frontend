import { useState } from "react"
import { dummyJeux } from "./dommyJeux"

export default function ListeJeuFestivalMobile() {

    const [filtresOpen, setFiltreOpen] = useState(false)
    const jeux = dummyJeux

    const renderJeu = (name: string, id: string) => {
        return (
            <div className="flex flex-row justify-between">
                <p>{name}</p>
                <p>{id}</p> {/* TODO */}
            </div>
        )
    }

    console.log("loading " + filtresOpen)
    return (
        <>
            <p className="text-2xl font-bold">
                Affichage des jeux du festival
            </p>
            <div className="flex flex-col w-full">
                <div className="flex flex-row">
                    <button className="rounded-lg p-2 border-slate-800 border-1 bg-vert-moyen my-6" onClick={() => setFiltreOpen(!filtresOpen)}>
                        Filtres
                    </button>
                </div>

                <div className="flex flex-col overflow-y-auto h-96">
                    {jeux.map((jeu) => {
                        return renderJeu(jeu.name, jeu.idGame + "")
                    })}
                </div>

                <div
                    className={"fixed top-1/2 " + (filtresOpen ? " -left-full " : " left-0 ")}
                >
                    <div className="bg-bleu-clair text-black rounded-r-lg flex flex-col p-3">
                        <div className="flex flex-col">
                            <p>Tags</p>
                            <div className="flex flex-row gap-2">
                                <input type="checkbox" name="Tag1" id="1" />
                                <p>Tag 1</p>
                            </div>
                            <div className="flex flex-row gap-2">
                                <input type="checkbox" name="Tag2" id="2" />
                                <p>Tag 2</p>
                            </div>
                            <div className="flex flex-row gap-2">
                                <input type="checkbox" name="Tag3" id="3" />
                                <p>Tag 3</p>
                            </div>
                            <div className="flex flex-row gap-2">
                                <input type="checkbox" name="Tag4" id="4" />
                                <p>Tag 4</p>
                            </div>
                            <div className="flex flex-row gap-2">
                                <input type="checkbox" name="Tag5" id="5" />
                                <p>Tag 5</p>
                            </div>
                        </div>

                        <p>Mechaniques</p>
                        <p>Theme</p>
                    </div>
                </div>
            </div>
        </>
    )
}