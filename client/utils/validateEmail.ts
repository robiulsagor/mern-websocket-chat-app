const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export function validateEmail(email: string) {
    return re.test(email);
}