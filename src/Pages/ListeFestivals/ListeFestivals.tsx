import styles from './ListeFestivals.module.css';
import { DesktopOnly, MobileOnly } from '../../Utils/IsMobile'; import ListeFestivalsDesktop from './ListeFestivalsDesktop';
import ListeFestivalsMobile from './ListeFestivalsMobile';

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

	const festivals : festival[] = [
		{
			id: 1,
			name: "Festival de Cannes",
			description: "Le Festival de Cannes est un festival de cinéma international se déroulant chaque année à Cannes (Alpes-Maritimes, France) durant douze jours. Il est organisé par le Festival de Cannes, association de loi 1901 à but non lucratif qui a pour vocation de « faire découvrir et valoriser des œuvres pour trouver des talents, ouvrir des marchés, favoriser les échanges culturels, professionnels et amicaux entre ceux qui font le cinéma, défendre la liberté de l’expression artistique et l’indépendance des pays cinématographiques en contribuant à l’expansion de l’art cinématographique. »",
			date_debut: "2021-07-06",
			date_fin: "2021-07-17",
			adresse: "Palais des festivals et des congrès de Cannes, 1 boulevard de la Croisette, 06400 Cannes"
		},
		{
			id: 2,
			name: "Festival de Cannes",
			description: "Le Festival de Cannes est un festival de cinéma international se déroulant chaque année à Cannes (Alpes-Maritimes, France) durant douze jours. Il est organisé par le Festival de Cannes, association de loi 1901 à but non lucratif qui a pour vocation de « faire découvrir et valoriser des œuvres pour trouver des talents, ouvrir des marchés, favoriser les échanges culturels, professionnels et amicaux entre ceux qui font le cinéma, défendre la liberté de l’expression artistique et l’indépendance des pays cinématographiques en contribuant à l’expansion de l’art cinématographique. »",
			date_debut: "2021-07-06",
			date_fin: "2021-07-17",
			adresse: "Palais des festivals et des congrès de Cannes, 1 boulevard de la Croisette, 06400 Cannes"
		},
		{
			id: 3,
			name: "Festival de Cannes",
			description: "Le Festival de Cannes est un festival de cinéma international se déroulant chaque année à Cannes (Alpes-Maritimes, France) durant douze jours. Il est organisé par le Festival de Cannes, association de loi 1901 à but non lucratif qui a pour vocation de « faire découvrir et valoriser des œuvres pour trouver des talents, ouvrir des marchés, favoriser les échanges culturels, professionnels et amicaux entre ceux qui font le cinéma, défendre la liberté de l’expression artistique et l’indépendance des pays cinématographiques en contribuant à l’expansion de l’art cinématographique. »",
			date_debut: "2021-07-06",
			date_fin: "2021-07-17",
			adresse: "Palais des festivals et des congrès de Cannes, 1 boulevard de la Croisette, 06400 Cannes"
		},
	];

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