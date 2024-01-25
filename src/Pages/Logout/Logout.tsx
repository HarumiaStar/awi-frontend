import { useNavigate } from "react-router-dom"
import { logout } from "../../Utils/Types"

export default function Logout() {
    const navigate = useNavigate();
    logout().then(() => {
        navigate("/");
    }).catch((err) => {
        console.log(err)
    })
    
    return (
        <div>
            <h1>Logout</h1>
        </div>
    )
}