import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { adminUserPublish, modalState } from "../recoil/atoms/atoms";
import { adminUserSelector } from "../recoil/selectors/selectors";
import { toast } from "react-toastify";
import PubSub from 'pubsub-js'

export const AdminModal = () => {
    const [modal, setModal] = useRecoilState(modalState);
    const [agreement, setAgreement] = useState(false);
    const adminUser = useRecoilValue(adminUserSelector);
    const [editCheck, setEditCheck] = useRecoilState(adminUserPublish);
    const [values, setValues] = useState({ username: "", email: "", password: "", repeatPassword: "", phone: "", isAdmin: false });

    const handleClickOutside = (event) => {
        if (modal && event.target.id === "default-modal") {
            setModal(false);
        }
    };

    const handleChange = (e, name) => {
        const newValues = {
            ...values,
            [name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
        };
        setValues(newValues);
    };

    const handleSubmit = async (e) => {
        try {
            if (values.password !== values.repeatPassword) {
                throw new Error("Passwords do not match");
            }
            const { repeatPassword, ...rest } = values;
            const response = await fetch(
                "http://localhost:5000/api/admin/edit/user", {
                method: "Put",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "original": { "email": adminUser.email },
                    "modified": rest,
                }),
                cache: "default",
            }
            );

            const res = await response.json();

            if (response.ok) {
                setModal(false);
                setAgreement(false);
                setEditCheck(res.user);
                toast.success("User edited successfully");
            } else {
                const message = Object.values(res).join(", ");
                throw new Error(message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        if (adminUser !== "") {
            setValues({
                username: adminUser.username,
                email: adminUser.email,
                phone: adminUser.phone,
                isAdmin: adminUser.isAdmin,
                password: "",
                repeatPassword: "",
            });
        }
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [modal, adminUser]);

    return (
        <div
            id="default-modal"
            tabIndex="-1"
            aria-hidden="true"
            className={`${modal ? "bg-slate-200/75 flex" : "hidden"} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-500 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
        >
            <div className="relative p-4 w-full max-w-2xl max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div id="inner-modal" className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Edit User
                        </h3>
                        <button
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            data-modal-hide="default-modal"
                            onClick={() => setModal(false)}
                        >
                            <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className="p-4 md:p-5 space-y-4">
                        <form className="mx-auto w-full">
                            <div className="mb-5 flex gap-5">
                                <div className="w-1/2">
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Username
                                    </label>
                                    <input
                                        value={values.username}
                                        onChange={(e) => handleChange(e, "username")}
                                        type="text"
                                        id="text"
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                        required
                                    />
                                </div>
                                <div className="w-1/2">
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Your email
                                    </label>
                                    <input
                                        value={values.email}
                                        onChange={(e) => handleChange(e, "email")}
                                        type="email"
                                        id="email"
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="mb-5 flex gap-5">
                                <div className="w-1/2">
                                    <label
                                        htmlFor="password"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Your password
                                    </label>
                                    <input
                                        value={values.password}
                                        onChange={(e) => handleChange(e, "password")}
                                        type="password"
                                        id="password"
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                        required
                                    />
                                </div>
                                <div className="w-1/2">
                                    <label
                                        htmlFor="repeat-password"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Repeat password
                                    </label>
                                    <input
                                        type="password"
                                        value={values.repeatPassword}
                                        onChange={(e) => handleChange(e, "repeatPassword")}
                                        id="confirm -password"
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="mb-5">
                                <label
                                    htmlFor="phone-number"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Phone Number
                                </label>
                                <input
                                    value={values.phone}
                                    onChange={(e) => handleChange(e, "phone")}
                                    type="number"
                                    id="number"
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                    required
                                />
                            </div>
                            <div className="flex gap-5">
                                <div className="flex items-start mb-5">
                                    <div className="flex items-center h-5">
                                        <input
                                            id="Admin"
                                            type="checkbox"
                                            checked={values.isAdmin}
                                            onChange={(e) => handleChange(e, "isAdmin")}
                                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                                        />
                                    </div>
                                    <label
                                        htmlFor="Admin"
                                        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                    >
                                        Assign me admin
                                    </label>
                                </div>

                                <div className="flex items-start mb-5">
                                    <div className="flex items-center h-5">
                                        <input
                                            id="terms"
                                            type="checkbox"
                                            checked={agreement}
                                            onChange={(e) => {
                                                setAgreement(e.target.checked);
                                            }}
                                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                                            required
                                        />
                                    </div>
                                    <label
                                        htmlFor="terms"
                                        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                    >
                                        I agree with the{" "}
                                        <a
                                            href="#"
                                            className="text-blue-600 hover:underline dark:text-blue-500"
                                        >
                                            terms and conditions
                                        </a>
                                    </label>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                        <button
                            type="submit"
                            className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-75 ${agreement ? "" : "disabled:opacity-25 cursor-not-allowed"
                                }`}
                            disabled={!agreement}
                            onClick={() => handleSubmit(values)}
                        >
                            Edit
                        </button>
                        <button
                            data-modal-hide="default-modal"
                            onClick={() => setModal(false)}
                            type="button"
                            className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
