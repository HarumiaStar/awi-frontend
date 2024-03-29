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
		if (!changedInfos.includes(id)) {
			let newInfo = changedInfos;
			newInfo.push(id);
			setChangedInfos(newInfo);
		}
	}

	const onSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const target = event.target as HTMLSelectElement;
		const id = target.id;
		if (!changedInfos.includes(id)) {
			let newInfo = changedInfos;
			newInfo.push(id);
			setChangedInfos(newInfo);
		}
	}


	const onSave = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		event.preventDefault();
		event.stopPropagation();

		// Form a data object with the changed infos
		let data: Record<string, string> = {};
		changedInfos.forEach((id) => {
			const element = document.getElementById(id) as HTMLInputElement;
			data[id] = element.value;
		});

		const instance = Api.getInstance();

		instance.putApi("/volunteers/me", JSON.stringify(data), true).then((response) => {
			if (response.status !== 200) {
				console.log("Error while updating volunteer : " + response.status);
				return;
			}
			console.log("Volunteer updated");
		});
	}

	const baseDefaultInputs = (
		<>
			<Input type="text" placeholder='Prénom' icon={<MdDriveFileRenameOutline />} id="firstname" onChange={onInputChange} />
			<Input type="text" placeholder='Nom' icon={<MdDriveFileRenameOutline />} id="lastname" onChange={onInputChange} />
			<Input type="text" placeholder="Nom d'utilisateur" icon={<MdDriveFileRenameOutline />} id="username" onChange={onInputChange} />
			<Input type="email" placeholder='Email' icon={<HiEnvelope />} id="email" onChange={onInputChange} />
			<Radio radioOptions={tailles_tshirt} name="Taille du t-shirt" icon={<FaTshirt />} id="tshirt_size" onChange={onSelectChange} />
			<Input type="number" placeholder="Nombre d'éditions participé" icon={<AiOutlineFieldNumber />} id="nb_edition_performed" onChange={onInputChange} />
			<Input type="text" placeholder='Adresse' icon={<FaHome />} id="address" onChange={onInputChange} />
			<Input type="text" placeholder='06 12 34 56 78 90' icon={<FaPhone />} id="phone" onChange={onInputChange} />
			<Input type="text" placeholder="URL de l'avatar" icon={<IoMdContact />} id="avatar_url" onChange={onInputChange} />
			<Radio radioOptions={regimes_alimentaires} name="Régime alimentaire" icon={<PiForkKnifeBold />} id="diet" onChange={onSelectChange} />
			<Radio radioOptions={lodging} name="Logement" icon={<FaHome />} id="lodging" onChange={onSelectChange} />
			<div className={styles.isAdmin}>
				Vous n'êtes pas administrateur
			</div>
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


		const nouvellesTaillesTshirt = tailles_tshirt.map((taille) => {
			if (taille.value === selfVolunteer.tshirt_size)
				return { ...taille, checked: true };
			else
				return { ...taille, checked: false };
		});

		const nouveauxRegimesAlimentaires = regimes_alimentaires.map((regime) => {
			if (regime.value === selfVolunteer.food_regime)
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
				<Input type="text" placeholder='Prénom' icon={<MdDriveFileRenameOutline />} id="firstname" onChange={onInputChange} value={selfVolunteer.firstname} autocomplete='given-name' />
				<Input type="text" placeholder='Nom' icon={<MdDriveFileRenameOutline />} id="lastname" onChange={onInputChange} value={selfVolunteer.lastname} autocomplete='family-name' />
				<Input type="text" placeholder="Nom d'utilisateur" icon={<MdDriveFileRenameOutline />} id="username" onChange={onInputChange} value={selfVolunteer.username} autocomplete='username' />
				<Input type="email" placeholder='Email' icon={<HiEnvelope />} id="email" onChange={onInputChange} value={selfVolunteer.email} autocomplete='email' />
				<Radio radioOptions={nouvellesTaillesTshirt} name="Taille du t-shirt" icon={<FaTshirt />} id="tshirt_size" onChange={onSelectChange} />
				<Input type="number" placeholder="Nombre d'éditions participé" icon={<AiOutlineFieldNumber />} id="nb_edition_performed" onChange={onInputChange} value={selfVolunteer.nb_edition_performed} />
				<Input type="text" placeholder='Adresse' icon={<FaHome />} id="address" onChange={onInputChange} value={selfVolunteer.address} autocomplete='street-address' />
				<Input type="text" placeholder='06 12 34 56 78 90' icon={<FaPhone />} id="phone" onChange={onInputChange} value={selfVolunteer.phone} autocomplete='tel' />
				<Input type="text" placeholder="URL de l'avatar" icon={<IoMdContact />} id="avatar_url" onChange={onInputChange} value={selfVolunteer.avatar_url} />
				<Radio radioOptions={nouveauxRegimesAlimentaires} name="Régime alimentaire" icon={<PiForkKnifeBold />} id="diet" onChange={onSelectChange} />
				<Radio radioOptions={nouveauLodging} name="Logement" icon={<FaHome />} id="lodging" onChange={onSelectChange} />
				<div className={styles.isAdmin}>
					Vous {selfVolunteer.isAdmin ? "êtes" : "n'êtes pas"} administrateur.
				</div>
			</>
		);

		setDefaultInputs(formInputs);
	}


	return (
		<div className="flex flex-col w-full overflow-y-auto gap-4 items-center">
			<h1 className="text-2xl font-bold">
				Paramètres
			</h1>

			<div className="flex flex-col gap-4 border-2 p-4 rounded-lg border-gray-30">
				<Form>
					{defaultInputs}
					{boutonSauvegarder}
				</Form>
			</div>
		</div>
	);
}