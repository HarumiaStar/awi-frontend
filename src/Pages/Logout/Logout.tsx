import { redirect } from "react-router-dom"
import { logout } from "../../Utils/Types"

export default function Logout() {
    logout().then(() => {
        redirect("/")
    }).catch((err) => {
        console.log(err)
    })
    
    return (
        <div>
            <h1>Logout</h1>
        </div>
    )
}