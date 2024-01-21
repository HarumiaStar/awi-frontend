import Authentification from "../../Utils/Authentification";
import { HiEnvelope, HiLockClosed } from "react-icons/hi2";
import "./LoginMobile.css"
import { useEffect } from "react";
import findParentWithClass from "../../Utils/firstParentWithClass";


export default function LoginMobile() {

    console.log(Authentification.getInstance().isConnected)
    useEffect(() => {
        // listener on form input, onclick focus on input
        const input = document.querySelectorAll(".login_mobile_content_form_input")
        input.forEach((element) => {
            element.addEventListener("click", () => {
                // focus on the input child of the div
                const input = element.querySelector("input")
                if (input)
                    input.focus()
            })
        })
    }
    )

    function connectionHandler(event : React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        event.preventDefault()
        const button : HTMLElement = event.target as HTMLButtonElement
        const form = findParentWithClass(button, "login_mobile_content_form") as HTMLFormElement
        
        const loginInput = form.querySelector("#login") as HTMLInputElement
        const passwordInput = form.querySelector("#password") as HTMLInputElement

        const login = loginInput.value
        const password = passwordInput.value

        Authentification.getInstance().connect(login, password)
        console.log(Authentification.getInstance().isConnected)
    }


    const boutonConnexion = <button className="login_mobile_connect" onClick={connectionHandler}>Connexion</button>

    return <div className="login_container">
        <div className="login_mobile">
            <div className="login_mobile_header">
                <div className="login_mobile_header_title">
                    Connexion
                </div>
            </div>
            <div className="login_mobile_content">
                <form action="#">
                    <div className="login_mobile_content_form">
                        <div className="login_mobile_content_form_input">
                            <div className="login_mobile_content_form_input_icon">
                                <HiEnvelope />
                            </div>
                            <input type="text" name="login" id="login" placeholder="Email" />
                        </div>
                        <div className="login_mobile_content_form_input">
                            <div className="login_mobile_content_form_input_icon">
                                <HiLockClosed />
                            </div>
                            <input type="password" name="password" id="password" placeholder="Mot de passe" />
                        </div>
                        <div className="login_mobile_content_form_button">
                            {boutonConnexion}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>

}