const MOBILE_WIDTH = 768;


export default function isMobile() {
    return window.innerWidth <= MOBILE_WIDTH;
}

export function MobileOnly({ children }: { children: React.ReactNode }) {
    return isMobile() ? children : null;
}

export function DesktopOnly({ children }: { children: React.ReactNode }) {
    return isMobile() ? null : children;
}