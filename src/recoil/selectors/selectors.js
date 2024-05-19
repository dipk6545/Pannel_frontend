import { selector } from "recoil";
import { alertState, tokenState, userState } from "../atoms/atoms";

export const alertSelector = selector({
    key: "alertSelector",
    get: ({ get }) => {
        return get(alertState);
    }
})

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