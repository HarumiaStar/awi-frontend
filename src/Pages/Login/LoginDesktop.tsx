import { v4 } from 'uuid';
import { Button, Form, Input } from '../../Utils/Form';
import style from './LoginDesktop.module.css';
import { HiEnvelope, HiLockClosed } from "react-icons/hi2";
import { Link } from 'react-router-dom';

export default function LoginDesktop({ loginHandler }: { loginHandler: (email: string, password: string) => void }) {

    const onLogin = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        event.stopPropagation();
        const emailInput = document.querySelector("#email") as HTMLInputElement;
        const passwordInput = document.querySelector("#password") as HTMLInputElement;

        const email = emailInput.value;
        const password = passwordInput.value;
        loginHandler(email, password);
    }



    return <div className={style.mainArea}>
        <div className={style.infoArea}>
        </div>
        <div className={style.loginArea}>
            <div className={style.loginAreaContentTitle}>
                <h1 className='text-4xl font-bold text-center'>
                    Connexion
                </h1>
            </div>
            <Form>
                <Input type="email" placeholder='Email' icon={<HiEnvelope />} id="email" autocomplete='email' />
                <Input type="password" placeholder='Mot de passe' icon={<HiLockClosed />} id="password" autocomplete='current-password' />
                <Button type="submit" text="Se connecter" id={v4()} onClick={onLogin} />
            </Form>

            <div className={style.sideActionLinks}>
                <Link to="/register">S'inscrire</Link>
                <Link to="/reset-password">Mot de passe oublié ?</Link>
            </div>
        </div>
    </div >
}