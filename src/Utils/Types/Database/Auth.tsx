import { Api } from ".";
export async function login(email: string, password: string): Promise<boolean> {
    const instance = Api.getInstance();


    await setupHashSeed();

    password = instance.encryptWithHashSeed(password);

    const res: Response = await instance.postApi("/auth/login", JSON.stringify({ email, password }));
    if (res.status !== 200) {
        console.log("Connexion failed : " + res.status);
        return false;
    }

    const data = await res.json();
    const token = data.token;

    instance.setToken(token);

    return true;
}

export async function logout(): Promise<boolean> {
    const instance = Api.getInstance();

    const res: Response = await instance.getApi("/auth/logout");
    if (res.status !== 200) {
        return false;
    }

    instance.setToken("");

    return true;
}


export type RegisterData = {
    firstname: string;
    lastname: string;
    email: string;
    tshirt_size: string;
    nb_edition_performed: number;
    lodging: string;
    address: string;
    phone_number: string;
    avatar_url: string;
    food_regime: string;
    password: string;
    password_encrypted: boolean;
}

export async function register(data: RegisterData): Promise<boolean> {
    const instance = Api.getInstance();
    if (!data.password_encrypted) {
        await setupHashSeed();
        data.password = instance.encryptWithHashSeed(data.password);
    }

    // Remove password_encrypted from data
    const newData = {
        "firstname": data.firstname,
        "lastname": data.lastname,
        "email": data.email,
        "tshirt_size": data.tshirt_size,
        "nb_edition_performed": data.nb_edition_performed,
        "lodging": data.lodging,
        "address": data.address,
        "phone_number": data.phone_number,
        "avatar_url": data.avatar_url,
        "food_regime": data.food_regime,
        "password": data.password,
    }


    const res: Response = await instance.postApi("/auth/register", JSON.stringify(newData));

    if (res.status !== 201) {
        return false;
    }

    return true;

}

export async function setupHashSeed(): Promise<boolean> {
    const instance = Api.getInstance();

    if (instance.getHashSeed() !== null) {
        instance.setHashSeed("");
    }

    const res: Response = await instance.getHashSeedFromServer();
    if (res.status !== 200) {
        return false;
    }

    const data = await res.json();
    const hash_seed = data.hashSeed;

    instance.setHashSeed(hash_seed);
    return true;
}