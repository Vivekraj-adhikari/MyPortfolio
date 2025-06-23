import { useContext, createContext } from "react";

export const BookContext = createContext({
    currentPage: 0,
    nextPage: () => {},
    prevPage: () => {},
});

export const BookProvider = BookContext.Provider;

export default function useBook(){
    return useContext(BookContext);
}