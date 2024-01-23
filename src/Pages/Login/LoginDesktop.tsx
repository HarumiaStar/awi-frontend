import { v4 } from 'uuid';
import { Button, Form, Input } from '../../Utils/Form';
import style from './LoginDesktop.module.css';
import { HiEnvelope, HiLockClosed } from "react-icons/hi2";

export default function LoginDesktop() {

    const loginHandler = (event : React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        event.stopPropagation();
        console.log("login");
    }



    return <div className={style.mainArea}>
        <div className={style.infoArea}>
        </div>
        <div className={style.loginArea}>
            <div className={style.loginAreaContentTitle}>
                <h1>Connexion</h1>
            </div>
            <Form className="mynewclass">
                <Input type="email" placeholder='Email' icon={<HiEnvelope />} id={v4()} />
                <Input type="password" placeholder='Mot de passe' icon={<HiLockClosed />} id={v4()} />
                <Button type="submit" text="Se connecter" id={v4()} onClick={loginHandler} />
            </Form>

            <div className={style.sideActionLinks}>
                <Button type="button" text="Mot de passe oublié ?" id={v4()} replaceInputClass={style.sideActionButton} />
                <Button type="button" text="Créer un compte" id={v4()} replaceInputClass={style.sideActionButton} />
            </div>
        </div>
    </div>
}