export type Festival = {
    id: string;
    title: string;
    description: string;
    posterPath: string;
    address: string;
    startDate: string;
    endDate: string;
}

export type Jeu = {
    id: string,
    name: string,
    author: string,
    editor: string,
    maxPlayers: number,
    minPlayers: number,
    minAge: number,
    duration: number,
    toAnimate: boolean,
    recieved: boolean,
    type: string,
    mechanics: string,
    theme: string,
    tags: string,
    description: string,
    image: string,
    logo: string,
    video: string,
    manual: string
}
