export default function findParentWithClass(element: HTMLElement, className: string): HTMLElement | null {
    let currentElement : HTMLElement | null = element;

    // Iterate through parent elements until a match is found or the top of the DOM is reached
    while (currentElement) {
        if (currentElement.classList && currentElement.classList.contains(className)) {
            return currentElement;
        }
        currentElement = currentElement.parentElement;
    }

    return null; // Return null if no matching parent is found
};