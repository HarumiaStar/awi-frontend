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
        const lastname = document.getElementById("lastname") as HTMLInputElement;
        const email = document.getElementById("email") as HTMLInputElement;
        const nb_edition_perfomed = document.getElementById("nb_edition_perfomed") as HTMLInputElement;
        const address = document.getElementById("address") as HTMLInputElement;
        const phone_number = document.getElementById("phone_number") as HTMLInputElement;
        const avatar_url = document.getElementById("avatar_url") as HTMLInputElement;
        const password = document.getElementById("password") as HTMLInputElement;
        const password_confirm = document.getElementById("password_confirm") as HTMLInputElement;

        // Reset all errors
        firstname.classList.remove(style.error);
        lastname.classList.remove(style.error);
        email.classList.remove(style.error);
        nb_edition_perfomed.classList.remove(style.error);
        address.classList.remove(style.error);
        phone_number.classList.remove(style.error);
        avatar_url.classList.remove(style.error);
        password.classList.remove(style.error);
        password_confirm.classList.remove(style.error);
        


        if (firstname.value === "") {
            firstname.classList.add(style.error);
            console.log("Firstname is empty");
            return false;
        }

        if (lastname.value === "") {
            lastname.classList.add(style.error);
            console.log("Lastname is empty");
            return false;
        }

        if (email.value === "") {
            email.classList.add(style.error);
            console.log("Email is empty");
            return false;
        }

        if (nb_edition_perfomed.value === "") {
            nb_edition_perfomed.classList.add(style.error);
            console.log("Number of edition is empty");
            return false;
        }

        if (address.value === "") {
            address.classList.add(style.error);
            console.log("Address is empty");
            return false;
        }

        if (phone_number.value === "") {
            phone_number.classList.add(style.error);
            console.log("Phone number is empty");
            return false;
        }

        if (avatar_url.value === "") {
            avatar_url.classList.add(style.error);
            console.log("Avatar is empty");
            return false;
        }

        if (password.value === "") {
            password.classList.add(style.error);
            console.log("Password is empty");
            return false;
        }

        if (password_confirm.value === "") {
            password_confirm.classList.add(style.error);
            console.log("Password is empty");
            return false;
        }

        if (password.value !== password_confirm.value) {
            password.classList.add(style.error);
            password_confirm.classList.add(style.error);
            console.log("Password not match");
            return false;
        }

        return true;
    }

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

                <Radio radioOptions={tailles_tshirt} name="Taille du t-shirt" icon={<FaTshirt />} />

                <Input type="number" placeholder="Nombre d'éditions participé" icon={<AiOutlineFieldNumber />} id="nb_edition_perfomed" />

                <Input type="text" placeholder='Adresse' icon={<FaHome />} id="address" />

                <Input type="text" placeholder='06 12 34 56 78 90' icon={<FaPhone />} id="phone_number" />

                <Input type="text" placeholder="URL de l'avatar" icon={<IoMdContact />} id="avatar_url" />

                <Radio radioOptions={regimes_alimentaires} name="Régime alimentaire" icon={<PiForkKnifeBold />} />


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