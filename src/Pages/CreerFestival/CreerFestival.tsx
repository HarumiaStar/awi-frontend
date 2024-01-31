import { Form, MultipartForm } from '../../Utils/Form';
import { FormGroup } from '../../Utils/Form/MutlipartForm';
import ChoixCreneaux from './ChoixCreneaux';
import { useRef } from 'react';
import Alerte, { AlerteRefType } from '../../Utils/Alerte';
import InformationsGenerales from './InformationsGenerales/InformationsGenerales';
import ImportJeux from './ImportJeux/ImportJeux';
import ChoixActivité from './ChoixActivités';

type CreaneauRefType = {
	getData: () => any;
};

export default function CreerFestival() {

	const creneauxRef = useRef<CreaneauRefType>(null);
	const AlerteRef = useRef<AlerteRefType>(null);

	const handleSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		event.preventDefault();
		console.log(creneauxRef.current?.getData());
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
			<Alerte ref={AlerteRef}  />
			<h1 className='text-4xl font-bold text-center'>
				CreerFestival
			</h1>

			<div className='flex flex-col items-center justify-center w-full h-full border-2 border-gray-400 rounded-lg px-6 my-5'>
				<Form>
					<MultipartForm nextButtonOptions={nextButtonOptions} submitButtonOptions={submitButtonOptions}>
						<FormGroup>
							<InformationsGenerales />
						</FormGroup>
						<FormGroup>
							<ChoixCreneaux ref={creneauxRef} />
						</FormGroup>

						<FormGroup>
							<ImportJeux />
						</FormGroup>

						<FormGroup>
							<ChoixActivité />
						</FormGroup>

						<FormGroup>
							<h2 className='text-2xl font-bold'>
								Récapitulatif
							</h2>
							{/* TODO Ajouter le récapitulatif */}
						</FormGroup>
					</MultipartForm>
				</Form>
			</div>
		</div>
	);
}