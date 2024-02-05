import { useRef, useState } from 'react';

import { Form, MultipartForm } from '../../Utils/Form';
import { FormGroup } from '../../Utils/Form/MutlipartForm';

import Alerte, { AlerteRefType } from '../../Utils/Alerte';
import { DonneesFestival } from './DonneesFestival';

import InformationsGenerales from './InformationsGenerales/InformationsGenerales';
import ChoixCreneaux from './ChoixCreneaux';
import ImportJeux from './ImportJeux/ImportJeux';
import ChoixActivite from './ChoixActivites';
import ChoixZones from './ChoixZones';
import Recapitulatif from './Recapitulatif';
import { ChoixCreneauxRef } from './ChoixCreneaux/ChoixCreneaux';
import { Api, parseNbJoueur, prepareCreneauExport } from '../../Utils/Types';
import { dateToExport } from '../../Utils/Types/DateUtils';
import { validationData } from './ValidationFestival';




export default function CreerFestival() {

	// Refs de l'alerte
	const AlerteRef = useRef<AlerteRefType>(null);

	const choixCrenRef = useRef<ChoixCreneauxRef>(null);

	// Données du festival
	const [donneesFestival] = useState<DonneesFestival>(new DonneesFestival());


	const handleSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		event.preventDefault();
		const festival = {
			title: donneesFestival.nomFestival,
			start_date: dateToExport(donneesFestival.dateDebut),
			end_date: dateToExport(donneesFestival.dateFin),
			description: donneesFestival.description,
			address: donneesFestival.lieuFestival,
			poster_path: donneesFestival.lienAffiche,
		};

		if(validationData(festival.title, festival.start_date, festival.end_date, festival.address, festival.description, festival.poster_path) === false){
			return;
		}

		const gamesRaw = donneesFestival.jeux.map((jeu) => {

			const nbJoueur = parseNbJoueur(jeu.nbJoueurs);

			let nbJoueurMin = undefined;
			let nbJoueurMax = undefined;

			if (nbJoueur) {
				nbJoueurMin = nbJoueur.item1;
				nbJoueurMax = nbJoueur.item2;
			}

			return {
				idGame: jeu.idJeu,
				name: jeu.nom,
				author: jeu.auteur,
				editor: jeu.editeur,
				description: jeu.description,
				minPlayer: nbJoueurMin,
				maxPlayer: nbJoueurMax,
				minAge: jeu.ageMin,
				duration: jeu.duree,
				toAnimate: jeu.aAnimer,
				recieved: jeu.recu,
				type: jeu.type,
				mechanics: jeu.mecanismes,
				theme: jeu.themes,
				tags: jeu.tags,
				image: jeu.image,
				logo: jeu.logo,
				video: jeu.video,
				manual: jeu.notice,
			};

		});

		// Retirer les jeux en double
		const games = gamesRaw.filter((game, index) => {
			return gamesRaw.findIndex((g) => g.idGame === game.idGame) === index;
		});

		let zones = donneesFestival.zones.map((zone) => {
			return {
				idZone: zone.idZone,
				name: zone.nom,
				description: "",
				animation: true,
				maxCapacity: 1,
			};
		});

		// Parcourir les jeux et récupérer les zones non présentes dans la liste
		donneesFestival.jeux.map((jeu) => {
			if (!zones.some((zone) => zone.idZone === jeu.idZone)) {
				zones.push({
					idZone: jeu.idZone,
					name: jeu.zoneBenevole?? jeu.zonePlan,
					description: "",
					animation: true,
					maxCapacity: 1,
				});
			}
		});

		const slots: {
			startTime: string,
			endTime: string,
		}[] = [];
		donneesFestival.joursCreneaux.map((jour) => {
			jour.creneaux.map((creneau) => {
				slots.push({
					startTime: prepareCreneauExport(creneau.heureDebut),
					endTime: prepareCreneauExport(creneau.heureFin),
				});
			});
		});

		// Pour chaque ligne de jeux, on crée une gamezone {gameId: 1, zoneId: 1}
		const gameZones = donneesFestival.jeux.map((game) => {
			return {
				idJeu: game.idJeu,
				idZone: game.idZone,
			}
		});



		// Ajout des activités aux zones
		donneesFestival.activites.map((activite) => {
			let randomId = Math.floor(Math.random() * 1000000);
			while (zones.some((zone) => zone.idZone === randomId)) {
				randomId = Math.floor(Math.random() * 1000000);
			}

			zones.push({
				idZone: randomId,
				name: activite,
				description: "",
				animation: false,
				maxCapacity: 1,
			});
		});


		const data = {
			...festival,
			games: games,
			zones: zones,
			gameZones: gameZones,
			slots: slots,
		};

		const instanceApi = Api.getInstance();

		if (!instanceApi.isAdmin){
			alert("Vous n'êtes pas admin");
			return;
		}

		const promesse = instanceApi.postApi("/festivals/new", JSON.stringify(data));

		promesse.then((res) => {
			if (res.status === 200) {
				AlerteRef.current?.open(
					"Festival créé",
					"Le festival a bien été créé",
					() => { }, // onConfirm
					() => { }, // onCancel
					"Ok",
					"Annuler"
				);
			} else {
				AlerteRef.current?.open(
					"Erreur",
					"Une erreur est survenue : " + res.json(),
					() => { }, // onConfirm
					() => { }, // onCancel
					"Ok",
					"Annuler"
				);
			}
		});


	}

	const nextButtonOptions = {
		text: "Suivant",
	};

	const submitButtonOptions = {
		text: "Créer le festival",
		onSubmit: handleSubmit,
	};

	return (
		<div>
			<Alerte ref={AlerteRef} />
			<h1 className='text-4xl font-bold text-center'>
				CreerFestival
			</h1>

			<div className='flex flex-col items-center justify-center w-full h-full border-2 border-gray-400 rounded-lg px-6 my-5'>
				<Form>
					<MultipartForm nextButtonOptions={nextButtonOptions} submitButtonOptions={submitButtonOptions}>
						<FormGroup>
							<InformationsGenerales donneesFestival={donneesFestival} choixCreneauxRef={choixCrenRef} />
						</FormGroup>
						<FormGroup>
							<ChoixCreneaux donneesFestival={donneesFestival} ref={choixCrenRef} />
						</FormGroup>

						<FormGroup>
							<ImportJeux donneesFestival={donneesFestival} />
						</FormGroup>

						<FormGroup>
							<ChoixActivite donneesFestival={donneesFestival} />
						</FormGroup>

						<FormGroup>
							<ChoixZones donneesFestival={donneesFestival} />
						</FormGroup>

						<FormGroup>
							<Recapitulatif donneesFestival={donneesFestival} />
							{/* <div className='flex flex-row justify-center'>
								Affichage du récapitulatif
							</div> */}
						</FormGroup>
					</MultipartForm>
				</Form>
			</div>
		</div>
	);
}