// import { useState } from "react";
// import { DetailZone, Jeu } from "../../../Utils/Types";
// import { ChoixActiviteRefType } from "../ChoixActivites";
// import { CreaneauRefType } from "../ChoixCreneaux";
// import { ChoixZonesRefType } from "../ChoixZones/ChoixZones";
// import { InformationsGeneralesRefType } from "../InformationsGenerales/InformationsGenerales";
// import { DonneesFestival } from "../DonneesFestival";

// export type RecapitulatifRefType = {
//     getCleanData: () => any;
// }

// export type RecapitulatifProps = {
//     donneesFestival: DonneesFestival;
// }


// export default function Recapitulatif({ donneesFestival }: RecapitulatifProps) {

//     // State
//     const [activiteOpen, setActiviteOpen] = useState(false);



//     return (
//         <div className='flex flex-col w-full h-full border-2 border-gray-400 rounded-lg px-6 my-5'>
//             <h1 className='text-4xl font-bold text-center'>
//                 Recapitulatif
//             </h1>
//             <div className='flex flex-col gap-3'>
//                 <div className='flex flex-row'>
//                     <h2 className='text-2xl font-bold'>
//                         Nom du festival :
//                     </h2>
//                     <p className='text-xl ml-2'>
//                         {nomFestival}
//                     </p>
//                 </div>
//                 <div className='flex flex-row'>
//                     <h2 className='text-2xl font-bold'>
//                         Date du festival :
//                     </h2>
//                     <p className='text-xl ml-2'>
//                         {dateDebut} - {dateFin}
//                     </p>
//                 </div>
//                 <div className='flex flex-row'>
//                     <h2 className='text-2xl font-bold'>
//                         Lieu du festival :
//                     </h2>
//                     <p className='text-xl ml-2'>
//                         {lieuFestival}
//                     </p>
//                 </div>
//                 <div className='flex flex-row'>
//                     <h2 className='text-2xl font-bold'>
//                         Description :
//                     </h2>
//                     <p className='text-xl ml-2'>
//                         {description}
//                     </p>
//                 </div>
//                 <div className='flex flex-col' onClick={() => setActiviteOpen(!activiteOpen)}>
//                     <h2 className='text-xl font-bold'>
//                         Activités :
//                     </h2>
//                     <div className={`${activiteOpen ? 'block' : 'hidden'}`} >
//                         {activites.map((activite, index) => (
//                             <p key={index} className='text-xl ml-2'>
//                                 {activite}
//                             </p>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }