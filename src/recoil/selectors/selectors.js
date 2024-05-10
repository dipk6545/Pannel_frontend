import { selector } from "recoil";
import { alertState, tokenState } from "../atoms/atoms";

export const alertSelector = selector({
    key: "alertSelector",
    get: ({ get }) => {
        return get(alertState);
    }
})

export const tokenSelector = selector({
    key: "tokenSelector",
    get: ({get})=>{
        let token=localStorage.getItem("token");
        let tokenAtom=get(tokenState);
        return token??tokenAtom;

    },
})