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
import { Tuple, lodging, regimes_alimentaires, register, tailles_tshirt } from '../../Utils/Types';

export default function Register() {


    const RegisterHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        event.stopPropagation();
        const validation = validateForm();

        if (validation.item1) {
            console.log("OK");
        } else {
            const registerMessageError = document.getElementById("registerMessageError") as HTMLDivElement;
            registerMessageError.classList.remove(style.disabled);
            registerMessageError.children[0].innerHTML = validation.item2;
            return;
        }

        registerToAPI().then((res) => {
            if (res) {
                console.log("Enregistré");
            } else {
                const registerMessageError = document.getElementById("registerMessageError") as HTMLDivElement;
                registerMessageError.classList.remove(style.disabled);
                registerMessageError.children[0].innerHTML = "Une erreur est survenue";
            }
        }, () => {
            const registerMessageError = document.getElementById("registerMessageError") as HTMLDivElement;
            registerMessageError.classList.remove(style.disabled);
            registerMessageError.children[0].innerHTML = "Une erreur est survenue";
        });
    }


    async function registerToAPI(): Promise<boolean> {

        const firstnameElmt = document.getElementById("firstname") as HTMLInputElement
        const firstname = firstnameElmt.value;

        const lastnameElmt = document.getElementById("lastname") as HTMLInputElement
        const lastname = lastnameElmt.value;

        const usernameElmt = document.getElementById("username") as HTMLInputElement
        const username = usernameElmt.value;

        const emailElmt = document.getElementById("email") as HTMLInputElement
        const email = emailElmt.value;

        const tshirt_sizeElmt = document.getElementById("tshirt_size") as HTMLSelectElement
        const tshirt_size = tshirt_sizeElmt.value;

        const nb_edition_perfomedElmt = document.getElementById("nb_edition_performed") as HTMLInputElement
        const nb_edition_performed: number = parseInt(nb_edition_perfomedElmt.value);

        const addressElmt = document.getElementById("address") as HTMLInputElement
        const address = addressElmt.value;

        const phone_numberElmt = document.getElementById("phone") as HTMLInputElement
        const phone = phone_numberElmt.value;

        const avatar_urlElmt = document.getElementById("avatar_url") as HTMLInputElement
        const avatar_url = avatar_urlElmt.value;

        const dietElmt = document.getElementById("diet") as HTMLSelectElement
        const diet = dietElmt.value;

        const passwordElmt = document.getElementById("password") as HTMLInputElement
        const password = passwordElmt.value;

        const lodgingElmt = document.getElementById("lodging") as HTMLSelectElement
        const lodging = lodgingElmt.value;


        const data = {
            "firstname": firstname,
            "lastname": lastname,
            "username": username,
            "email": email,
            "tshirt_size": tshirt_size,
            "nb_edition_performed": nb_edition_performed,
            "address": address,
            "phone": phone,
            "avatar_url": avatar_url,
            "food_regime": diet,
            "lodging": lodging,
            "password": password,
            "password_encrypted": false
        };
        return await register(data);
    }




    const validateForm = (): Tuple<boolean, string> => {

        const firstname = document.getElementById("firstname") as HTMLInputElement;
        const firstnameData = firstname.value;
        if (firstnameData === undefined || firstnameData === null || firstnameData === "" || firstnameData === " ") {
            return new Tuple(false, "Le prénom est vide");
        }

        const lastname = document.getElementById("lastname") as HTMLInputElement;
        const lastnameData = lastname.value;
        if (lastnameData === undefined || lastnameData === null || lastnameData === "" || lastnameData === " ") {
            return new Tuple(false, "Le nom est vide");
        }

        const username = document.getElementById("username") as HTMLInputElement;
        const usernameData = username.value;
        if (usernameData === undefined || usernameData === null || usernameData === "" || usernameData === " ") {
            return new Tuple(false, "Le nom d'utilisateur est vide");
        }

        const email = document.getElementById("email") as HTMLInputElement;
        const emailData = email.value;
        if (emailData === undefined || emailData === null || emailData === "" || emailData === " ") {
            return new Tuple(false, "L'email est vide");
        }

        const tshirt_size = document.getElementById("tshirt_size") as HTMLSelectElement;
        const tshirt_sizeData = tshirt_size.value;
        if (tshirt_sizeData === undefined || tshirt_sizeData === null || tshirt_sizeData === "" || tshirt_sizeData === " ") {
            return new Tuple(false, "La taille du t-shirt est vide");
        }

        const nb_edition_perfomed = document.getElementById("nb_edition_performed") as HTMLInputElement;
        const nb_edition_perfomedData = nb_edition_perfomed.value;
        if (nb_edition_perfomedData === undefined || nb_edition_perfomedData === null || nb_edition_perfomedData === "" || nb_edition_perfomedData === " ") {
            return new Tuple(false, "Le nombre d'éditions participé est vide");
        }

        const address = document.getElementById("address") as HTMLInputElement;
        const addressData = address.value;
        if (addressData === undefined || addressData === null || addressData === "" || addressData === " ") {
            return new Tuple(false, "L'adresse est vide");
        }

        const phone_number = document.getElementById("phone") as HTMLInputElement;
        const phone_numberData = phone_number.value;
        if (phone_numberData === undefined || phone_numberData === null || phone_numberData === "" || phone_numberData === " ") {
            return new Tuple(false, "Le numéro de téléphone est vide");
        }

        const avatar_url = document.getElementById("avatar_url") as HTMLInputElement;
        const avatar_urlData = avatar_url.value;
        if (avatar_urlData === undefined || avatar_urlData === null || avatar_urlData === "" || avatar_urlData === " ") {
            return new Tuple(false, "L'url de l'avatar est vide");
        }

        const diet = document.getElementById("diet") as HTMLSelectElement;
        const dietData = diet.value;
        if (dietData === undefined || dietData === null || dietData === "" || dietData === " ") {
            return new Tuple(false, "Le régime alimentaire est vide");
        }

        const password = document.getElementById("password") as HTMLInputElement;
        const passwordData = password.value;
        if (passwordData === undefined || passwordData === null || passwordData === "" || passwordData === " ") {
            return new Tuple(false, "Le mot de passe est vide");
        }

        const password_confirm = document.getElementById("password_confirm") as HTMLInputElement;
        const password_confirmData = password_confirm.value;
        if (password_confirmData === undefined || password_confirmData === null || password_confirmData === "" || password_confirmData === " ") {
            return new Tuple(false, "La confirmation du mot de passe est vide");
        }

        if (passwordData !== password_confirmData) {
            return new Tuple(false, "Les mots de passe ne correspondent pas");
        }

        return new Tuple(true, "");
    }

    return <div className={style.mainArea}>
        <div className={style.infoArea}>
        </div>
        <div className={style.loginArea}>
            <div className={style.loginAreaContentTitle}>
                <h1>Connexion</h1>
            </div>
            <Form>
                <Input type="text" placeholder='Prénom' icon={<MdDriveFileRenameOutline />} id="firstname" />
                <Input type="text" placeholder='Nom' icon={<MdDriveFileRenameOutline />} id="lastname" />
                <Input type="text" placeholder="Nom d'utilisateur" icon={<MdDriveFileRenameOutline />} id="username" />
                <Input type="email" placeholder='Email' icon={<HiEnvelope />} id="email" />
                <Radio radioOptions={tailles_tshirt} name="Taille du t-shirt" icon={<FaTshirt />} id="tshirt_size" />
                <Input type="number" placeholder="Nombre d'éditions participé" icon={<AiOutlineFieldNumber />} id="nb_edition_performed" />
                <Input type="text" placeholder='Adresse' icon={<FaHome />} id="address" />
                <Input type="text" placeholder='06 12 34 56 78 90' icon={<FaPhone />} id="phone" />
                <Input type="text" placeholder="URL de l'avatar" icon={<IoMdContact />} id="avatar_url" />
                <Radio radioOptions={regimes_alimentaires} name="Régime alimentaire" icon={<PiForkKnifeBold />} id="diet" />
                <Radio radioOptions={lodging} name="Logement" icon={<FaHome />} id="lodging" />
                <Input type="password" placeholder='Mot de passe' icon={<HiLockClosed />} id="password" />
                <Input type="password" placeholder='Confirmer le mot de passe' icon={<HiLockClosed />} id="password_confirm" />
                <Button type="submit" text="S'enregister" id={v4()} onClick={RegisterHandler} />

                <div className={style.registerMessage}>
                    <p>En vous inscrivant, vous acceptez les <a href="#">conditions d'utilisation</a> et la <a href="#">politique de confidentialité</a> de l'application.</p>
                    <div className={style.registerMessageError + " " + style.disabled} id='registerMessageError'>
                        <p>Erreur</p>
                    </div>
                </div>
            </Form>

            <div className={style.sideActionLinks}>
                <Button type="button" text="Déjà un compte ?" id={v4()} replaceInputClass={style.sideActionButton} />
            </div>
        </div>
    </div>
}