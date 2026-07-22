"use client";

import { useState } from "react";
import { Button, Container, Row, Col, } from "react-bootstrap";
import UserList from "@/features/adminUsers/components/UserList";
import CreateUserModal from "@/features/adminUsers/components/CreateUserModal";
import useAdminUserActions from "@/features/adminUsers/hooks/useAdminUserActions";

export default function AdminUsersContent() {
    const {
        create,
    } = useAdminUserActions();

    const [showCreate, setShowCreate,] = useState(false);

    return (
        <>
            <Container fluid className="py-4">
                <Row className="mb-4">
                    <Col>
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <h2>User Management</h2>
                                <p className="text-muted">Manage Admins, Agents and Users</p>
                            </div>
                            <Button onClick={() => setShowCreate(true)}>
                                + Create User
                            </Button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <UserList />
                    </Col>
                </Row>
            </Container>
            <CreateUserModal show={showCreate} onClose={() => setShowCreate(false)} onSubmit={create} />
        </>
    );
}