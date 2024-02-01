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




export default function CreerFestival() {

	// Refs de l'alerte
	const AlerteRef = useRef<AlerteRefType>(null);

	const choixCrenRef = useRef<ChoixCreneauxRef>(null);

	// Données du festival
	const [donneesFestival] = useState<DonneesFestival>(new DonneesFestival());


	const handleSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		event.preventDefault();
		console.log("Submit");
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
							<ImportJeux  donneesFestival={donneesFestival} />
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