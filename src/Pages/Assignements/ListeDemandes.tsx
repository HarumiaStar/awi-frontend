import { useState } from "react";

type Wish = {
    id: string;
    zoneId: string;
    slotId: string;
    volunteerId: string;
};

export default function ListeDemandes() {

    const [wishes, setWishes] = useState<Wish[]>([]);



    return (
        <div>
            <h1>Liste des demandes</h1>
            <table>
                <thead>
                    <tr>
                        <th>Zone</th>
                        <th>Créneau</th>
                        <th>Volontaire</th>
                    </tr>
                </thead>
                <tbody>
                    {wishes.map(wish => (
                        <tr key={wish.id}>
                            <td>{wish.zoneId}</td>
                            <td>{wish.slotId}</td>
                            <td>{wish.volunteerId}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}