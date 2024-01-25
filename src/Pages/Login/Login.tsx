import { useNavigate } from "react-router-dom";
import { DesktopOnly, MobileOnly } from "../../Utils/IsMobile";
import { login } from "../../Utils/Types";
import LoginDesktop from "./LoginDesktop";
import LoginMobile from "./LoginMobile";

export default function Login() {
    const loginHandler = async (email : string, password : string) => {
        const navigate = useNavigate();

        const res = await login(email, password)
        if (res){
            console.log("Login success")
            navigate("/");
        }
        
    }
    return <>
        <DesktopOnly>
            <LoginDesktop loginHandler={loginHandler} />
        </DesktopOnly>
        <MobileOnly>
            <LoginMobile loginHandler={loginHandler} />
        </MobileOnly>
    </>
}