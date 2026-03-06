export const qs = s => document.querySelector(s);
export const qsa = s => Array.from(document.querySelectorAll(s));
export const generateId = ()  => {
    return "_" + Math.random().toString(36).substr(2, 9)
};
export const now = () => new Date().toISOString();