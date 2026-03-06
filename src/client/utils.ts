export const qs = (s: string) => document.querySelector(s);
export const qsa = (s: string) => Array.from(document.querySelectorAll(s));
export const generateId = (): string  => {
    return "_" + Math.random().toString(36).substr(2, 9)
};