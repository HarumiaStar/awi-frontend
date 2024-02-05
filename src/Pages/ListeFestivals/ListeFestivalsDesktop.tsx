import { FaMapPin } from 'react-icons/fa';
import { ListeFestivalsProps } from './ListeFestivals';
import styles from './ListeFestivalsDesktop.module.css';

export default function ListeFestivalsDesktop({ festivals }: ListeFestivalsProps) {

	return (
		<div className='flex flex-col items-center justify-center w-full h-full rounded-lg px-6 my-5'>
			<h1 className='text-4xl font-bold text-center mb-5'>
				Liste des festivals a venir
			</h1>

			<div className='flex flex-col items-center justify-center w-full h-full rounded-lg px-6 my-5'>
				{festivals.map((festival) => (
					<div 
					className='flex flex-col items-center justify-center w-full min-h-48 rounded-lg px-6 my-5 hover:scale-105 hover:bg-lighter-300 transition-all duration-400 bg-lighter-200'
					key={festival.id}
					>
						<div className='flex flex-row justify-between rounded-lg w-full '>
							<div className={styles.festivalName}>{festival.name}</div>
							<div className={styles.festivalDate}>{festival.date_debut} - {festival.date_fin}</div>
						</div>
						<div className='flex flex-col items-center justify-center w-fullrounded-lg'>
							<div className={styles.festivalDescription}><strong>Description : </strong>{festival.description}</div>
						</div>
						<div className={styles.festivalAdresseContainer}>
							<div className={styles.festivalAdresse}>{festival.adresse}</div>
							<FaMapPin size={20} />
						</div>
					</div>
				))}
			</div>
		</div>
	);
}