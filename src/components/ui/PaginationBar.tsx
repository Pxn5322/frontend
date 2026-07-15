"use client";

import Pagination from "react-bootstrap/Pagination";

interface Props {
    currentPage: number;
    pageSize: number;
    setCurrentPage: (page: number) => void;
    total: number;
}

export default function PaginationBar({ currentPage, pageSize, setCurrentPage, total }: Props) {
    const totalPages = Math.ceil(total / pageSize);

    if (totalPages <= 1) {
        return null;
    }

    return (
        <>
            <div className="text-center text-muted mb-2">
                Showing{" "}{Math.min(currentPage * pageSize, total)}{" "}of{" "}{total} tickets
            </div>
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
        </>
    );
}