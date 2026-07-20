"use client";

import { Card, Badge, Button, } from "react-bootstrap";
import { Tenant } from "../types/tenant";

interface Props {
    tenant: Tenant;
    onEdit: () => void;
    onDelete: () => void;
}

export default function TenantCard({ tenant, onEdit, onDelete, }: Props) {
    return (
        <Card className="mb-3 shadow-sm">
            <Card.Body>
                <div className="d-flex justify-content-between">
                    <div>
                        <h5>{tenant.companyName}</h5>
                        <small>Created{" "}{new Date(tenant.createdAt).toLocaleDateString()}</small>
                    </div>
                    <div>
                        <Badge bg="primary">{tenant._count.users} Users</Badge>
                        {" "}
                        <Badge bg="secondary">{tenant._count.tickets} Tickets</Badge>
                    </div>
                </div>
                <hr />
                <Button size="sm" className="me-2" onClick={onEdit}>Edit</Button>
                <Button size="sm" variant="danger" onClick={onDelete}>Delete</Button>
            </Card.Body>
        </Card>
    );
}