"use client";

import Pagination from "react-bootstrap/Pagination";
import { useTicketContext } from "@/contexts/TicketContext";

interface Props {
    totalTickets: number;
}

export default function PaginationBar({ totalTickets }: Props) {
    const {
        currentPage,
        pageSize,
        setCurrentPage,
    } = useTicketContext();

    const totalPages = Math.ceil(totalTickets / pageSize);

    if (totalPages <= 1) {
        return null;
    }

    return (
        <Pagination className="justify-content-center mt-4">
            <Pagination.Prev disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} />
            {Array.from({ length: totalPages }).map((_, index) => {
                const page = index + 1;

                return (
                    <Pagination.Item key={page} active={page === currentPage} onClick={() => setCurrentPage(page)}>
                        {page}
                    </Pagination.Item>
                );
            })}
            <Pagination.Next disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)} />
        </Pagination>
    );
}