import style from './LoginDesktop.module.css';
import { HiEnvelope, HiLockClosed } from "react-icons/hi2";

export default function LoginDesktop() {
    


    return <div className={style.mainArea}>
        <div className={style.infoArea}>
        </div>
        <div className={style.loginArea}>
            <div className={style.loginAreaContentTitle}>
                <h1>Connexion</h1>
            </div>
            <form className={style.form}>
                <div className={style.formInput}>
                    <HiEnvelope />
                    <input type="email" placeholder="Email" />
                </div>
                <div className={style.formInput}>
                    <HiLockClosed />
                    <input type="password" placeholder="Mot de passe" />
                </div>
                <input type="submit" value="Se connecter" className={style.formSubmit} />
            </form>
            <div className={style.contentLinks}>
                <a href="#">Mot de passe oublié ?</a>
                <a href="#">Créer un compte</a>
            </div>
        </div>
    </div>
}