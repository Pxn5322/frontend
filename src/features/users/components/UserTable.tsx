"use client";

import Table from "react-bootstrap/Table";
import useUsers from "../hooks/useUsers";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { useState } from "react";
import * as userService from "../services/userService";
import toast from "react-hot-toast";
import { Badge, Button, Form } from "react-bootstrap";
import { useAuth } from "@/contexts/AuthContext";
import ChangeRoleModal from "./ChangeRoleModal";

export default function UserTable() {
    const {
        users,
        loading,
        refresh,
    } = useUsers();

    const { platformUser } = useAuth();

    const [savingId, setSavingId] = useState<string>("");
    const [roles, setRoles] = useState<Record<string, "ADMIN" | "AGENT">>({});
    const [showChange, setShowChange] = useState(false);

    if (loading) {
        return <LoadingSpinner />;
    }

    async function saveRole(id: string) {
        try {
            await userService.updateRole(id, roles[id]);
            toast.success("Role updated");
            await refresh();
        }
        catch {
            toast.error("Unable to update role");
        }
        finally {
            setSavingId("");
        }
    }

    return (
        <>
            <Table striped hover bordered>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Created</th>
                        <th style={{ width: '120' }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <Form.Select
                                    value={roles[user.id] ?? user.role}
                                    onChange={(e) => setRoles(previous => ({
                                        ...previous,
                                        [user.id]: e.target.value as "ADMIN" | "AGENT"
                                    }))}>
                                    <option value="ADMIN">ADMIN</option>
                                    <option value="AGENT">AGENT</option>
                                </Form.Select>
                            </td>
                            <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                            <td>
                                <Button size="sm" onClick={() => { setShowChange(true); setSavingId(user.id); }} disabled={platformUser?.id === user.id}>
                                    Save
                                </Button>
                                {platformUser?.id === user.id && (
                                    <small className="text-muted d-block">
                                        Cannot modify yourself
                                    </small>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <ChangeRoleModal show={showChange} onClose={() => setShowChange(false)} onConfirm={() => saveRole(savingId)} />
        </>
    );
}