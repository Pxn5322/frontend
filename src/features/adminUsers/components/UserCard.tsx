"use client";

import { Card, Button, } from "react-bootstrap";
import { AdminUser } from "../types/adminUser";
import { useState, } from "react";
import EditUserModal from "./EditUserModal";
import ResetPasswordModal from "./ResetPasswordModal";
import DeleteConfirmModal from "@/components/ui/DeleteConfirmModal";
import useAdminUserActions from "../hooks/useAdminUserActions";
import RoleBadge from "@/components/RoleBadge";

interface Props {
    user: AdminUser;
}

export default function UserCard({ user, }: Props) {
    const {
        update,
        password,
        remove,
    } = useAdminUserActions();

    const [showEdit, setShowEdit,] = useState(false);
    const [showPassword, setShowPassword,] = useState(false);
    const [showDelete, setShowDelete,] = useState(false);

    async function handleDelete() {
        await remove(user.id);
        setShowDelete(false);
    }

    return (
        <>
            <Card className="mb-3 shadow-sm">
                <Card.Body>
                    <div className="d-flex justify-content-between">
                        <div>
                            <h5>{user.name}</h5>
                            <small>{user.email}</small>
                        </div>
                        <div>
                            <RoleBadge role={user.role} />
                        </div>
                    </div>
                    <hr />
                    <Button size="sm" className="me-2" onClick={() => setShowEdit(true)}>
                        Edit
                    </Button>
                    <Button size="sm" variant="warning" className="me-2" onClick={() => setShowPassword(true)}>
                        Password
                    </Button>
                    <Button size="sm" variant="danger" onClick={() => setShowDelete(true)}>
                        Delete
                    </Button>
                </Card.Body>
            </Card>

            <EditUserModal
                show={showEdit}
                user={user}
                onClose={() => setShowEdit(false)}
                onSave={update}
            />

            <ResetPasswordModal
                show={showPassword}
                userId={user.id}
                onClose={() => setShowPassword(false)}
                onSave={password}
            />

            <DeleteConfirmModal
                show={showDelete}
                title={user.name}
                onClose={() => setShowDelete(false)}
                onConfirm={handleDelete}
            />
        </>
    );
}