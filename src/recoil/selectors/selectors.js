import { selector } from "recoil";
import { adminState, adminUserPublish, adminUserState, tokenState, userState } from "../atoms/atoms";

export const tokenSelector = selector({
    key: "tokenSelector",
    get: ({get})=>{
        let tokenAtom=get(tokenState);
        return tokenAtom;

    },
})

export const userSelector = selector({
    key: "userSelector",
    get: ({ get }) => {
        return get(userState);
    },
})

export const adminSelector = selector({
    key: "adminSelector",
    get: ({ get }) => {
        return get(adminState);
    },
})

export const adminUserSelector = selector({
    key: "adminUserSelector",
    get: ({ get }) => {
        return get(adminUserState);
    },
})

export const adminUserSubcribe=selector({
    key: "adminUserSubcribe",
    get: ({ get }) => {
        return get(adminUserPublish);
    },
})