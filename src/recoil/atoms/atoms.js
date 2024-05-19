import { atom } from "recoil";

export const alertState = atom({
    key: "alertState",
    default: {},
})

export const tokenState = atom({
    key: "tokenState",
    default: undefined,
})

export const contactInfo = atom({
    key: "contactInfo",
    default: undefined,
})

export const userState = atom({
    key: "userState",
    default: undefined,
})