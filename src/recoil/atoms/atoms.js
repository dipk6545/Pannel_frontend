import { atom } from "recoil";
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

export const adminState = atom({
    key: "adminState",
    default: false,
})

export const modalState = atom({
    key: "modalState",
    default: false,
})

export const adminUserState = atom({
    key: "adminUserState",
    default: "",
})

export const adminUserPublish=atom({
    key:"adminUserPublish",
    default:undefined
})