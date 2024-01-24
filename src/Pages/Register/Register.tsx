import { Button, Form, Input, Radio } from '../../Utils/Form';
import style from './Register.module.css';
import { HiEnvelope, HiLockClosed } from "react-icons/hi2";
import { AiOutlineFieldNumber } from "react-icons/ai";
import { PiForkKnifeBold } from "react-icons/pi";
import { FaTshirt } from "react-icons/fa";
import { IoMdContact } from "react-icons/io";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { v4 } from 'uuid';

export default function Register() {

    const RegisterHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        event.stopPropagation();
        if (validateForm()) {
            console.log("Register");
        }
        else {
            console.log("Error");
        }
    }

    const tailles_tshirt = [
        { name: "XS", value: "XS", checked: false },
        { name: "S", value: "S", checked: false },
        { name: "M", value: "M", checked: false },
        { name: "L", value: "L", checked: false },
        { name: "XL", value: "XL", checked: false },
        { name: "XXL", value: "XXL", checked: false },
        { name: "XXXL", value: "XXXL", checked: false }
    ];

    const regimes_alimentaires = [
        { name: "Végétarien", value: "vegetarien", checked: false },
        { name: "Carnivore", value: "carnivore", checked: false },
        { name: "Autre", value: "autre", checked: false }
    ];





    const validateForm = () => {

        const firstname = document.getElementById("firstname") as HTMLInputElement;
        const firstnameData = firstname.value;
        if (firstnameData === undefined || firstnameData === null || firstnameData === "" || firstnameData === " ") {
            return false;
        }

        const lastname = document.getElementById("lastname") as HTMLInputElement;
        const lastnameData = lastname.value;
        if (lastnameData === undefined || lastnameData === null || lastnameData === "" || lastnameData === " ") {
            return false;
        }

        const email = document.getElementById("email") as HTMLInputElement;
        const emailData = email.value;
        if (emailData === undefined || emailData === null || emailData === "" || emailData === " ") {
            return false;
        }

        const tshirt_size = document.getElementById("tshirt_size") as HTMLSelectElement;
        const tshirt_sizeData = tshirt_size.value;
        if (tshirt_sizeData === undefined || tshirt_sizeData === null || tshirt_sizeData === "" || tshirt_sizeData === " ") {
            return false;
        }

        const nb_edition_perfomed = document.getElementById("nb_edition_perfomed") as HTMLInputElement;
        const nb_edition_perfomedData = nb_edition_perfomed.value;
        if (nb_edition_perfomedData === undefined || nb_edition_perfomedData === null || nb_edition_perfomedData === "" || nb_edition_perfomedData === " ") {
            return false;
        }

        const address = document.getElementById("address") as HTMLInputElement;
        const addressData = address.value;
        if (addressData === undefined || addressData === null || addressData === "" || addressData === " ") {
            return false;
        }

        const phone_number = document.getElementById("phone_number") as HTMLInputElement;
        const phone_numberData = phone_number.value;
        if (phone_numberData === undefined || phone_numberData === null || phone_numberData === "" || phone_numberData === " ") {
            return false;
        }

        const avatar_url = document.getElementById("avatar_url") as HTMLInputElement;
        const avatar_urlData = avatar_url.value;
        if (avatar_urlData === undefined || avatar_urlData === null || avatar_urlData === "" || avatar_urlData === " ") {
            return false;
        }

        const diet = document.getElementById("diet") as HTMLSelectElement;
        const dietData = diet.value;
        if (dietData === undefined || dietData === null || dietData === "" || dietData === " ") {
            return false;
        }

        const password = document.getElementById("password") as HTMLInputElement;
        const passwordData = password.value;
        if (passwordData === undefined || passwordData === null || passwordData === "" || passwordData === " ") {
            return false;
        }

        const password_confirm = document.getElementById("password_confirm") as HTMLInputElement;
        const password_confirmData = password_confirm.value;
        if (password_confirmData === undefined || password_confirmData === null || password_confirmData === "" || password_confirmData === " ") {
            return false;
        }

        if (passwordData !== password_confirmData) {
            return false;
        }

        return true;
    }


    const setError = (id: string, error: boolean, inputListCopy: Record<string, JSX.Element>): Record<string, JSX.Element> => {
        const element = inputListCopy[id];
        // if oldInput is type Input
        if (element.type === Input) {
            inputListCopy[id] = <Input type={element.props.type} placeholder={element.props.placeholder} icon={element.props.icon} id={element.props.id} containerClass={element.props.containerClass} inputClass={element.props.inputClass} error={error} />
        }

        // if oldInput is type Radio
        if (element.type === Radio) {
            inputListCopy[id] = <Radio radioOptions={element.props.radioOptions} name={element.props.name} icon={element.props.icon} id={element.props.id} error={error} />
        }

        // if oldInput is type Button
        if (element.type === Button) {
            // nothing to do
        }

        return inputListCopy;
    }


    return <div className={style.mainArea}>
        <div className={style.infoArea}>
        </div>
        <div className={style.loginArea}>
            <div className={style.loginAreaContentTitle}>
                <h1>Connexion</h1>
            </div>
            <Form className="mynewclass">
                <Input type="text" placeholder='Prénom' icon={<MdDriveFileRenameOutline />} id="firstname" />
                <Input type="text" placeholder='Nom' icon={<MdDriveFileRenameOutline />} id="lastname" />
                <Input type="email" placeholder='Email' icon={<HiEnvelope />} id="email" />
                <Radio radioOptions={tailles_tshirt} name="Taille du t-shirt" icon={<FaTshirt />} id="tshirt_size" />
                <Input type="number" placeholder="Nombre d'éditions participé" icon={<AiOutlineFieldNumber />} id="nb_edition_perfomed" />
                <Input type="text" placeholder='Adresse' icon={<FaHome />} id="address" />
                <Input type="text" placeholder='06 12 34 56 78 90' icon={<FaPhone />} id="phone_number" />
                <Input type="text" placeholder="URL de l'avatar" icon={<IoMdContact />} id="avatar_url" />
                <Radio radioOptions={regimes_alimentaires} name="Régime alimentaire" icon={<PiForkKnifeBold />} id="diet" />
                <Input type="password" placeholder='Mot de passe' icon={<HiLockClosed />} id="password" />
                <Input type="password" placeholder='Confirmer le mot de passe' icon={<HiLockClosed />} id="password_confirm" />
                <Button type="submit" text="S'enregister" id={v4()} onClick={RegisterHandler} />
            </Form>

            <div className={style.sideActionLinks}>
                <Button type="button" text="Déjà un compte ?" id={v4()} replaceInputClass={style.sideActionButton} />
            </div>
        </div>
    </div>
}