import { atom } from "recoil";

export const alertState = atom({
    key: "alertState",
    default: {},
})

export const tokenState = atom({
    key: "tokenState",
    default: "",
})