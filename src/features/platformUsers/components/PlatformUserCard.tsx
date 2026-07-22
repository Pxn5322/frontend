"use client";

import { Card, Button } from "react-bootstrap";
import { useState } from "react";
import { PlatformUser } from "../types/platformUser";
import PlatformUserEditModal from "./PlatformUserEditModal";
import DeleteConfirmModal from "@/components/ui/DeleteConfirmModal";
import usePlatformUserActions from "../hooks/usePlatformUserActions";
import RoleBadge from "@/components/RoleBadge";

interface Props {
    user: PlatformUser;
}

export default function PlatformUserCard({ user, }: Props) {
    const {
        update,
        resetPassword,
        remove,
    } = usePlatformUserActions();

    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

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
                            <div>{user.email}</div>
                            <small>{user.tenant.companyName}</small>
                        </div>
                        <div className="text-end">
                            <RoleBadge role={user.role} />
                            <br />
                            <Button size="sm" className="mt-3 me-2" onClick={() => setShowEdit(true)}>
                                Edit
                            </Button>
                            <Button size="sm" variant="danger" className="mt-3" onClick={() => setShowDelete(true)}>
                                Delete
                            </Button>
                        </div>
                    </div>
                </Card.Body>
            </Card>

            <PlatformUserEditModal
                show={showEdit}
                user={user}
                onClose={() => setShowEdit(false)}
                onSave={update}
                onChangePassword={resetPassword}
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