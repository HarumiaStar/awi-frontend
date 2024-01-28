import { BiRename } from 'react-icons/bi';
import { DatePicker, Form, Input, MultipartForm, TextArea } from '../../Utils/Form';
import styles from './CreerFestival.module.css';
import { FaCommentAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { FormGroup } from '../../Utils/Form/MutlipartForm';
import ChoixCreneaux from './ChoixCreneaux';

export default function CreerFestival() {

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
			<h1 className='text-4xl font-bold text-center'>
				CreerFestival
			</h1>


			<div className='flex flex-col items-center justify-center w-full h-full border-2 border-gray-400 rounded-lg px-6 my-5'>
				<Form>
					<MultipartForm nextButtonOptions={nextButtonOptions} submitButtonOptions={submitButtonOptions}>
						<FormGroup>
							<h2 className='text-2xl font-bold'>
								Informations générales
							</h2>
							<Input type="text" placeholder='Nom du festival' icon={<BiRename />} id="nomFestival" />
							<DatePicker label="Date de début" id="dateDebut" />
							<DatePicker label="Date de fin" id="dateFin" />
							<Input type="text" placeholder='Lieu du festival' icon={<FaMapMarkerAlt />} id="lieuFestival" />
							<TextArea label="Description" id="description" icon={<FaCommentAlt />} />
							{/* <Input type="text" placeholder='Lien vers le site' icon={<FaCommentAlt />} id="lienSite" />*/}
						</FormGroup>
						<FormGroup>
							<ChoixCreneaux />
						</FormGroup>

						<FormGroup>
							<h2 className='text-2xl font-bold'>
								Informations sur les jeux
							</h2>
							{/* TODO Ajouter la gestion des jeux */}
						</FormGroup>

						<FormGroup>
							<h2 className='text-2xl font-bold'>
								Informations sur les activités
							</h2>
							{/* TODO Ajouter la gestion des activités */}
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