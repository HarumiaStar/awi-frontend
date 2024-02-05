import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Api } from "../../Utils/Types";
import { Festival } from "../../Utils/Types/Database";

export default function HomeDesktop() {
    
    const [currentFestival, setCurrentFestival] = useState<Festival | null>(null);
    const [cpt, setCpt] = useState(0);

    const instance = Api.getInstance();

    useEffect(() => {
        load(null);
    }, []);

    const load = (e : React.MouseEvent<HTMLButtonElement, MouseEvent> | null) => {
        if (e) e.preventDefault();
        instance.getApi('/festivals/current').then(async (response) => {
            if (!response.body) {
                alert('No festival found');
                return;
            }
            const festival = (await response.json()) as Festival;
            setCurrentFestival(festival);
        });
        setCpt(cpt + 1);
    }

    const navigator = useNavigate();

    const handleFestivalClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        navigator(`/detail-festival/${currentFestival?.id}`);
    }

    return <div className="flex flex-col items-center">
        <h1>Home Mobile</h1>
        {currentFestival ? (
            <div className="w-96 cursor-pointer" onClick={handleFestivalClick}>
                <div className="flex flex-col items-center">
                    <h1 className="font-bold text-2xl">Festival en cours</h1>
                    <div className="flex flex-col border-2 p-3 rounded-lg gap-3  w-full">
                        <div className="flex flex-row justify-between">
                            <div>
                                <h2>{currentFestival.title}</h2>
                            </div>
                            <div >
                                <p>{currentFestival.startDate} - {currentFestival.endDate}</p>
                            </div>
                        </div>
                        <p>{currentFestival.description}</p>
                        <p>{currentFestival.address}</p>
                        <img src={currentFestival.posterPath} alt={currentFestival.posterPath} />
                    </div>
                </div>
            </div>
        ) : <p>Loading...{cpt}</p>
        }

    </div >;
}