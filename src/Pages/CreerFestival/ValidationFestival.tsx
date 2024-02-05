
export const validationData = (title: string, start_date: string, end_date: string, address: string, description: string, poster_path: string) => {
    return titleValidation(title) && dateValidation(start_date) && dateValidation(end_date) && addressValidation(address) && descriptionValidation(description) && posterPathValidation(poster_path);
}

const titleValidation = (title: string) => {
    if (title.length < 10 || title.length > 255) {
        alert("Le titre doit contenir entre 10 et 255 caractères");
        return false;
    }
    return true;
}

const dateValidation = (date: string) => {
    if (date.length < 10 || date.length > 10) {
        alert("La date doit être au format jj/mm/aaaa");
        return false;
    }
    return true;
}

const addressValidation = (address: string) => {
    if (address.length < 10 || address.length > 255) {
        alert("L'adresse doit contenir entre 10 et 255 caractères");
        return false;
    }
    return true;
}

const descriptionValidation = (description: string) => {
    if (description.length < 10 || description.length > 255) {
        alert("La description doit contenir entre 10 et 255 caractères");
        return false;
    }
    return true;
}

const posterPathValidation = (poster_path: string) => {
    if (poster_path.length < 10 || poster_path.length > 5000) {
        alert("Le lien du poster doit contenir entre 10 et 5000 caractères");
        return false;
    }
    return true;
}

