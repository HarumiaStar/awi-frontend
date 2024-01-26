import { BiRename } from 'react-icons/bi';
import { DatePicker, Form, Input } from '../../Utils/Form';
import styles from './CreerFestival.module.css';

export default function CreerFestival() {
	return (
		<div>
			<h1 className={styles.h1}>CreerFestival</h1>


			<div className={styles.formContainer}>
				<Form>
					<Input type="text" placeholder='Nom du festival' icon={<BiRename />} id="nomFestival" />
					<DatePicker label="Date de début" id="dateDebut" />
				</Form>
			</div>
		</div>
	);
}