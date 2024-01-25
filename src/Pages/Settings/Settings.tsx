import { FaHome, FaPhone, FaTshirt } from 'react-icons/fa';
import { Button, Form, Input, Radio } from '../../Utils/Form';
import styles from './Settings.module.css';
import { PiForkKnifeBold } from 'react-icons/pi';
import { IoMdContact } from 'react-icons/io';
import { AiOutlineFieldNumber } from 'react-icons/ai';
import { HiEnvelope } from 'react-icons/hi2';
import { MdDriveFileRenameOutline } from 'react-icons/md';
import { Api, lodging, regimes_alimentaires, tailles_tshirt } from '../../Utils/Types';
import { useEffect, useState } from 'react';
import React from 'react';

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
	
	const baseDefaultInputs = (
		<>
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
		</>
	)
	const boutonSauvegarder = <Button type="submit" text="Enregistrer" onClick={onSave} />

	const [defaultInputs, setDefaultInputs] = useState(baseDefaultInputs);


	useEffect(() => {
		initialize();
	}, []);



	const initialize = async () => {
		const instance = Api.getInstance();

		const response = await instance.getApi("/volunteers/me", true);

		if (response.status !== 200) {
			console.log("Error while fetching volunteer : " + response.status);
			return;
		}


		const selfVolunteer = await response.json();

		/** selfVolunteer is a JSON object with the following structure :
		 * {
			"firstname": "azertyuq",
			"lastname": "qsdfghj",
			"email": "azertyu@gmail.com",
			"address": "azertyuisqdfg",
			"phone": null,
			"username": null,
			"avatarUrl": "azetryui",
			"nbEditionPerformed": "1",
			"tshirtSize": "M",
			"lodging": "recherche",
			"foodRegime": "vegetarien",
			"isAdmin": false
		}
		 */

		const nouvellesTaillesTshirt = tailles_tshirt.map((taille) => {
			if (taille.value === selfVolunteer.tshirtSize)
				return { ...taille, checked: true };
			else
				return { ...taille, checked: false };
		});

		const nouveauxRegimesAlimentaires = regimes_alimentaires.map((regime) => {
			if (regime.value === selfVolunteer.foodRegime)
				return { ...regime, checked: true };
			else
				return { ...regime, checked: false };
		});

		const nouveauLodging = lodging.map((logement) => {
			if (logement.value === selfVolunteer.lodging)
				return { ...logement, checked: true };
			else
				return { ...logement, checked: false };
		});

		const formInputs = (
			<>
				<Input type="text" placeholder='Prénom' icon={<MdDriveFileRenameOutline />} id="firstname" onChange={onInputChange} value={selfVolunteer.firstname} />
				<Input type="text" placeholder='Nom' icon={<MdDriveFileRenameOutline />} id="lastname" onChange={onInputChange} value={selfVolunteer.lastname} />
				<Input type="email" placeholder='Email' icon={<HiEnvelope />} id="email" onChange={onInputChange} value={selfVolunteer.email} />
				<Radio radioOptions={nouvellesTaillesTshirt} name="Taille du t-shirt" icon={<FaTshirt />} id="tshirt_size" onChange={onSelectChange} />
				<Input type="number" placeholder="Nombre d'éditions participé" icon={<AiOutlineFieldNumber />} id="nb_edition_performed" onChange={onInputChange} value={selfVolunteer.nbEditionPerformed} />
				<Input type="text" placeholder='Adresse' icon={<FaHome />} id="address" onChange={onInputChange} value={selfVolunteer.address} />
				<Input type="text" placeholder='06 12 34 56 78 90' icon={<FaPhone />} id="phone_number" onChange={onInputChange} value={selfVolunteer.phone} />
				<Input type="text" placeholder="URL de l'avatar" icon={<IoMdContact />} id="avatar_url" onChange={onInputChange} value={selfVolunteer.avatarUrl} />
				<Radio radioOptions={nouveauxRegimesAlimentaires} name="Régime alimentaire" icon={<PiForkKnifeBold />} id="diet" onChange={onSelectChange} />
				<Radio radioOptions={nouveauLodging} name="Logement" icon={<FaHome />} id="lodging" onChange={onSelectChange} />
			</>
		);

		setDefaultInputs(formInputs);
	}


	return (
		<div className={styles.mainContent}>
			<h1>Settings</h1>

			<div className={styles.formContainer}>
				<Form>
					{defaultInputs}
					{boutonSauvegarder}
				</Form>
			</div>
		</div>
	);
}