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
			<h1 >CreerFestival</h1>


			<div className={styles.formContainer}>
				<Form>
					<MultipartForm nextButtonOptions={nextButtonOptions} submitButtonOptions={submitButtonOptions}>
						<FormGroup>
							<h2>Informations générales</h2>
							<Input type="text" placeholder='Nom du festival' icon={<BiRename />} id="nomFestival" />
							<DatePicker label="Date de début" id="dateDebut" />
							<DatePicker label="Date de fin" id="dateFin" />
							<Input type="text" placeholder='Lieu du festival' icon={<FaMapMarkerAlt />} id="lieuFestival" />
							<TextArea label="Description" id="description" icon={<FaCommentAlt />} />
							{/* <Input type="text" placeholder='Lien vers le site' icon={<FaCommentAlt />} id="lienSite" />*/}
							{/* TODO A voir s'il faut mettre le lien */}

						</FormGroup>
						<FormGroup>
							<ChoixCreneaux />
							{/* TODO Ajouter la gestion des créneaux */}
						</FormGroup>

						<FormGroup>
							<h2>Informations sur les jeux</h2>
							{/* TODO Ajouter la gestion des jeux */}
						</FormGroup>

						<FormGroup>
							<h2>Informations sur les activités</h2>
							{/* TODO Ajouter la gestion des activités */}
						</FormGroup>

						<FormGroup>
							<h2>Récapitulatif</h2>
							{/* TODO Ajouter le récapitulatif */}
						</FormGroup>
					</MultipartForm>
				</Form>
			</div>
		</div>
	);
}