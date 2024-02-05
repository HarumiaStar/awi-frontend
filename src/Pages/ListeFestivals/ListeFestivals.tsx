import styles from './ListeFestivals.module.css';
import { DesktopOnly, MobileOnly } from '../../Utils/IsMobile'; import ListeFestivalsDesktop from './ListeFestivalsDesktop';
import ListeFestivalsMobile from './ListeFestivalsMobile';
import { Api, dateToStringFr } from '../../Utils/Types';
import { useEffect, useState } from 'react';

export type festival = {
	id: number;
	name: string;
	description: string;
	date_debut: string;
	date_fin: string;
	adresse: string;
};

export type ListeFestivalsProps = {
	festivals: festival[];
};
export default function ListeFestivals() {

	const [festivals, setFestivals] = useState<festival[]>([]);

	

    useEffect(() => {
        const getData = async () => {
			const response = await Api.getInstance().getApi('/festivals');
			const data = await response.json();
			if (response.status === 200) {
				const festivalDatas = data.map((festival: any) => {
					const start = new Date(festival.start_date);
					const end = new Date(festival.end_date);

					return {
						id: festival.id,
						name: festival.title,
						description: festival.description,
						date_debut: dateToStringFr(start),
						date_fin: dateToStringFr(end),
						adresse: festival.address
					};
				});
				setFestivals(festivalDatas);
			}
		}
		getData();
	}, []);

	return (
		<>
			<MobileOnly>
				<ListeFestivalsMobile festivals={festivals} />
			</MobileOnly>
			<DesktopOnly>
				<ListeFestivalsDesktop festivals={festivals} />
			</DesktopOnly>
		</>
	);
}