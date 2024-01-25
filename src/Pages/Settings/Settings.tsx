import { FaHome, FaPhone, FaTshirt } from 'react-icons/fa';
import { Button, Form, Input, Radio } from '../../Utils/Form';
import styles from './Settings.module.css';
import { PiForkKnifeBold } from 'react-icons/pi';
import { IoMdContact } from 'react-icons/io';
import { AiOutlineFieldNumber } from 'react-icons/ai';
import { HiEnvelope } from 'react-icons/hi2';
import { MdDriveFileRenameOutline } from 'react-icons/md';
import { lodging, regimes_alimentaires, tailles_tshirt } from '../../Utils/Types';
import { useState } from 'react';

export default function Settings() {

	const [changedInfos, setChangedInfos] = useState([] as string[])

	const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const target = event.target as HTMLInputElement;
		const id = target.id;
		if (!changedInfos.includes(id))
			setChangedInfos([...changedInfos, id]);
	}

	const onSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const target = event.target as HTMLSelectElement;
		const id = target.id;
		if (!changedInfos.includes(id))
			setChangedInfos([...changedInfos, id]);
	}


	const onSave = () => {
		console.log(changedInfos);
	}




	return (
		<div className={styles.Settings}>
			<h1>Settings</h1>

			<div className={styles.Settings__form}>
				<Form>
					<Input type="text" placeholder='Prénom' icon={<MdDriveFileRenameOutline />} id="firstname" onChange={onInputChange} />
					<Input type="text" placeholder='Nom' icon={<MdDriveFileRenameOutline />} id="lastname" onChange={onInputChange} />
					<Input type="email" placeholder='Email' icon={<HiEnvelope />} id="email" onChange={onInputChange} />
					<Radio radioOptions={tailles_tshirt} name="Taille du t-shirt" icon={<FaTshirt />} id="tshirt_size" onChange={onSelectChange} />
					<Input type="number" placeholder="Nombre d'éditions participé" icon={<AiOutlineFieldNumber />} id="nb_edition_performed" onChange={onInputChange} />
					<Input type="text" placeholder='Adresse' icon={<FaHome />} id="address" onChange={onInputChange} />
					<Input type="text" placeholder='06 12 34 56 78 90' icon={<FaPhone />} id="phone_number" onChange={onInputChange} />
					<Input type="text" placeholder="URL de l'avatar" icon={<IoMdContact />} id="avatar_url" onChange={onInputChange} />
					<Radio radioOptions={regimes_alimentaires} name="Régime alimentaire" icon={<PiForkKnifeBold />} id="diet" onChange={onSelectChange} />
					<Radio radioOptions={lodging} name="Logement" icon={<FaHome />} id="lodging" onChange={onSelectChange} />
					<Button type="submit" text="Enregistrer" onClick={onSave} />
				</Form>
			</div>
		</div>
	);
}