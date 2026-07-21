"use client";

import { Card, Badge, Button, } from "react-bootstrap";
import { Company } from "../types/company";
import { useState } from "react";
import useCompanyActions from "../hooks/useCompanyActions";
import CompanyEditModal from "./CompanyEditModal";
import DeleteConfirmModal from "@/components/ui/DeleteConfirmModal";

interface Props {
    company: Company;
}

export default function CompanyCard({ company, }: Props) {
    const { update, remove, } = useCompanyActions();

    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    async function handleDelete() {
        try {
            if (company.companyCode === "ENTERPRISE") {
                throw new Error("Cannot delete Enterprise company");
            }

            await remove(company.id);
            setShowDelete(false);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <Card className="mb-3 shadow-sm">
                <Card.Body>
                    <div className="d-flex justify-content-between">
                        <div>
                            <h5>{company.companyName}</h5>
                            <small>Created{" "}{new Date(company.createdAt).toLocaleDateString()}</small>
                            <h6>{company.companyCode}</h6>
                        </div>
                        <div>
                            <Badge bg="primary">{company._count?.users ?? 0} Users</Badge>
                            {" "}
                            <Badge bg="secondary">{company._count?.tickets ?? 0} Tickets</Badge>
                        </div>
                    </div>
                    <hr />
                    <Button size="sm" className="me-2" onClick={() => setShowEdit(true)}>Edit</Button>
                    <Button size="sm" variant="danger" onClick={() => setShowDelete(true)}>Delete</Button>
                </Card.Body>
            </Card>

            <CompanyEditModal
                show={showEdit}
                company={company}
                onClose={() => setShowEdit(false)}
                onSave={update}
            />

            <DeleteConfirmModal
                show={showDelete}
                title={company.companyName}
                onClose={() => setShowDelete(false)}
                onConfirm={handleDelete}
            />
        </>
    );
}