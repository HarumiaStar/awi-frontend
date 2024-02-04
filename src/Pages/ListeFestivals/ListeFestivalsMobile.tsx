import { FaMapPin } from 'react-icons/fa';
import { ListeFestivalsProps } from './ListeFestivals';
import styles from './ListeFestivalsMobile.module.css';
import findParentWithClass from '../../Utils/firstParentWithClass';

export default function ListeFestivalsMobile({ festivals }: ListeFestivalsProps) {
	const festivalOpen = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		const festival = findParentWithClass(event.target as HTMLElement, styles.festival);

		if (!festival) {
			return;
		}

		festival.classList.toggle(styles.open);

		const festivalContainer = festival?.querySelector(`.${styles.festivalContainer}`) as HTMLElement;

		if (festivalContainer) {
			festivalContainer.classList.toggle(styles.open);
		}

		const festivalOpenAction = festival?.querySelector(`.${styles.festivalOpenAction}`) as HTMLElement;

		if (festivalOpenAction) {
			festivalOpenAction.classList.toggle(styles.open);
		}
	}

	return (
		<div>
			<h1 className={styles.h1}>ListeFestivals</h1>
			<div className={styles.container}>
				{festivals.map((festival) => (
					<div className={styles.festival} key={festival.id}>
						<div className={styles.header} onClick={festivalOpen}>
							<div className={styles.title}>
								<div className={styles.festivalOpenAction}>
									{"\>"}
								</div>
								<div className={styles.festivalName}>{festival.name}</div>
							</div>
							<div className={styles.festivalDate}>{festival.date_debut} {"->"} {festival.date_fin}</div>
						</div>
						<div className={styles.festivalContainer}>
							<div className={styles.festivalDescriptionContainer}>
								<div className={styles.festivalDescription}><strong>Description : </strong>{festival.description}</div>
							</div>
							<div className={styles.festivalAdresseContainer}>
								<FaMapPin size={20} />

								<div className={styles.festivalAdresse}>{festival.adresse}</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}