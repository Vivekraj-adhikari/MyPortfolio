import { useContext, createContext } from "react";

export const BookContext = createContext({
    opened: false,
    page: "home",
    nextPage: () => {},
    prevPage: () => {},
})

export const BookProvider = BookContext.Provider;

export default function useBook(){
    return useContext(BookContext);
}