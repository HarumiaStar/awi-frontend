import { FaMapPin } from 'react-icons/fa';
import { ListeFestivalsProps } from './ListeFestivals';
import styles from './ListeFestivalsDesktop.module.css';

export default function ListeFestivalsDesktop({ festivals }: ListeFestivalsProps) {

	return (
		<div>
			<h1 className={styles.h1}>Liste des festivals a venir</h1>

			<div className={styles.container}>
				{festivals.map((festival) => (
					<div className={styles.festival} key={festival.id}>
						<div className={styles.header}>
							<div className={styles.festivalName}>{festival.name}</div>
							<div className={styles.festivalDate}>{festival.date_debut} - {festival.date_fin}</div>
						</div>
						<div className={styles.festivalDescriptionContainer}>
							<div className={styles.festivalDescription}><strong>Description : </strong>{festival.description}</div>
						</div>
						<div className={styles.festivalAdresseContainer}>
							<div className={styles.festivalAdresse}>{festival.adresse}</div>
							<FaMapPin size={20}/>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}