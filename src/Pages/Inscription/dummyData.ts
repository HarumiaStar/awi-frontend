type poste = {
    id: string;
    title: string;
    description: string;
    capacity: number;
    maxCapacity: number;
    animation: boolean;
}


export const dummyPoste : poste[] = [
    {
        id: "1",
        title: "Poste 1",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, eros eget tincidunt facilisis, libero nulla tincidunt libero, a tincidunt libero libero auctor. ",
        capacity: 0,
        maxCapacity: 5,
        animation: false
    },
    {
        id: "2",
        title: "Poste 2",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, eros eget tincidunt facilisis, libero nulla tincidunt libero, a tincidunt libero libero auctor. ",
        capacity: 0,
        maxCapacity: 5,
        animation: false
    },
    {
        id: "3",
        title: "Poste 3",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, eros eget tincidunt facilisis, libero nulla tincidunt libero, a tincidunt libero libero auctor. ",
        capacity: 0,
        maxCapacity: 5,
        animation: false
    },
    {
        id: "4",
        title: "Poste 4",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, eros eget tincidunt facilisis, libero nulla tincidunt libero, a tincidunt libero libero auctor. ",
        capacity: 0,
        maxCapacity: 5,
        animation: false
    },
    {
        id: "5",
        title: "Poste 5",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, eros eget tincidunt facilisis, libero nulla tincidunt libero, a tincidunt libero libero auctor. ",
        capacity: 0,
        maxCapacity: 5,
        animation: false
    },
    {
        id: "6",
        title: "Poste 6",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, eros eget tincidunt facilisis, libero nulla tincidunt libero, a tincidunt libero libero auctor. ",
        capacity: 0,
        maxCapacity: 5,
        animation: false
    },
    {
        id: "7",
        title: "Poste 7",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, eros eget tincidunt facilisis, libero nulla tincidunt libero, a tincidunt libero libero auctor. ",
        capacity: 0,
        maxCapacity: 5,
        animation: false
    },
    {
        id: "1",
        title: "Zone 1",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, eros eget tincidunt facilisis, libero nulla tincidunt libero, a tincidunt libero libero auctor. ",
        capacity: 0,
        maxCapacity: 5,
        animation: true
    },
    {
        id: "2",
        title: "Zone 2",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, eros eget tincidunt facilisis, libero nulla tincidunt libero, a tincidunt libero libero auctor. ",
        capacity: 0,
        maxCapacity: 5,
        animation: true
    },
    {
        id: "3",
        title: "Zone 3",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, eros eget tincidunt facilisis, libero nulla tincidunt libero, a tincidunt libero libero auctor. ",
        capacity: 0,
        maxCapacity: 5,
        animation: true
    },
    {
        id: "4",
        title: "Zone 4",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, eros eget tincidunt facilisis, libero nulla tincidunt libero, a tincidunt libero libero auctor. ",
        capacity: 0,
        maxCapacity: 5,
        animation: true
    },
    {
        id: "5",
        title: "Zone 5",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, eros eget tincidunt facilisis, libero nulla tincidunt libero, a tincidunt libero libero auctor. ",
        capacity: 0,
        maxCapacity: 5,
        animation: true
    },
    {
        id: "6",
        title: "Zone 6",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, eros eget tincidunt facilisis, libero nulla tincidunt libero, a tincidunt libero libero auctor. ",
        capacity: 0,
        maxCapacity: 5,
        animation: true
    },
    {
        id: "7",
        title: "Zone 7",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, eros eget tinc int facilisis, libero nulla tincidunt libero, a tincidunt libero libero auctor. ",
        capacity: 0,
        maxCapacity: 5,
        animation: true
    },
]

type creneau = {
    id: string;
    start: string;
    end: string;
}

export const dummyCreneau : creneau[] = [
    {
        id: "1",
        start: "10:00",
        end: "11:00",
    },
    {
        id: "2",
        start: "11:00",
        end: "12:00",
    },
    {
        id: "3",
        start: "14:00",
        end: "15:00",
    },
    {
        id: "4",
        start: "15:00",
        end: "16:00",
    },
    {
        id: "5",
        start: "16:00",
        end: "17:00",
    },
    {
        id: "6",
        start: "17:00",
        end: "18:00",
    },
    {
        id: "7",
        start: "18:00",
        end: "19:00",
    },
]