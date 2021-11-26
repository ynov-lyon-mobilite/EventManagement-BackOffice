import {useState} from "react";

export default function usePagination(defaultPageValue = 0, defaultRowsPerPageValue = 5){
    const [page, setPage] = useState(defaultPageValue);
    const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPageValue);

    const initialIndex = page * rowsPerPage;

    const changePage = (event, newPage) => {
        setPage(newPage);
    };

    const changeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return {page, rowsPerPage, changePage, changeRowsPerPage, initialIndex};
}