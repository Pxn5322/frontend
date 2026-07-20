"use client";

import { useTicketContext } from "@/features/tickets/context/TicketContext";
import { filterByPriority, filterBySearch, filterByStatus } from "../selectors/ticketSelectors";
import { sortTickets } from "../utils/ticketSort";
import { paginateTickets } from "../utils/ticketPagination";
import { useEffect } from "react";

export default function useVisibleTickets() {
    const {
        tickets,
        loading,
        search,
        statusFilter,
        priorityFilter,
        sort,
        currentPage,
        pageSize,
        setCurrentPage,
    } = useTicketContext();

    useEffect(() => {
        setCurrentPage(1);
    }, [search, statusFilter, priorityFilter, sort,]);

    const searchedTickets = filterBySearch(
        tickets,
        search
    );

    const statusTickets = filterByStatus(
        searchedTickets,
        statusFilter
    );

    const priorityTickets = filterByPriority(
        statusTickets,
        priorityFilter
    );

    const sortedTickets = sortTickets(
        priorityTickets,
        sort
    );

    const visibleTickets = paginateTickets(
        sortedTickets,
        currentPage,
        pageSize
    );

    return {
        currentPage,
        pageSize,
        setCurrentPage,
        visibleTickets,
        loading,
        totalTickets: sortedTickets.length,
        totalPages: Math.ceil(sortedTickets.length / pageSize),
    };
}