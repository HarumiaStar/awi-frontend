import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import { Api } from "../../../Utils/Types";

export default function InscriptionCreneau() {

    const location = useLocation();

    const params = new URLSearchParams(location.search);

    const posteId = params.get('poste');
    const creneauId = params.get('creneau');

    const [poste, setPoste] = useState<any>();
    const [creneau, setCreneau] = useState<any>();

    useEffect(() => {
        const posteData = Api.getInstance().getApi(`/zones/${posteId}`);
        posteData.then(async (response) => {
            if (!response.body) {
                alert('No poste found');
                return;
            }
            const poste = (await response.json());
            setPoste(poste);
        });

        const creneauData = Api.getInstance().getApi(`/slots/${creneauId}`);
        creneauData.then(async (response) => {
            if (!response.body) {
                alert('No creneau found');
                return;
            }
            const creneau = (await response.json());
            const start = creneau.startTime.split(' ')[1];
            const end = creneau.endTime.split(' ')[1];

            const date = creneau.startTime.split(' ')[0];
            setCreneau({
                start: start,
                end: end,
                date: date
            });
        });

    }, [posteId, creneauId]);

    const onSlotSelected = () => {
        const referent = (document.getElementById('referent') as HTMLInputElement).checked;
        const userPromise = Api.getInstance().getApi(`/volunteers/me`);
        userPromise.then(async (response) => {
            if (!response.body) {
                alert('No user found');
                return;
            }
            const user = (await response.json()) as any;
            console.log(user);
            const inscriptionData = Api.getInstance().postApi(`/wishes`, JSON.stringify({
                volunteer_id: user.id,
                zone_id: posteId,
                slot_id: creneauId,
                is_referent: referent
            }));

            inscriptionData.then(async (response) => {
                if (!(response.status === 200)) {
                    const bodyData = await response.json();
                    alert('Une erreur est survenue : ' + response.status + ' \n' + JSON.stringify(bodyData));
                    return;
                }
                alert('Inscription validée');
            });

        });
    };


    return (
        <div className="flex flex-col items-center gap-4 w-full border-2 p-2 rounded-md justify-around h-full">
            <h1 className="text-3xl">
                Inscription à :
            </h1>
            <h2 className="text-2xl">
                Poste ou animation : {poste?.name}
            </h2>
            <p className="text-lg">
                De {creneau?.start} à {creneau?.end}
            </p>
            <p className="text-lg">
                Le {creneau?.date}
            </p>
            {/* Checkbox pour demander s'il souhaite être référent pour ce poste  */}
            <div className="flex flex-row items-center gap-4">
                <input type="checkbox" id="referent" name="referent" value="referent" className="w-4 h-4" />
                <label htmlFor="referent" className="text-lg">
                    Je souhaite être référent pour ce poste
                </label>
            </div>

            <button className="bg-bleu-clair text-black p-2 rounded-md" onClick={() => onSlotSelected()}>
                Valider
            </button>
        </div>
    )
}