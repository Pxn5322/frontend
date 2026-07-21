import { CompanyEditFormData, companyEditSchema } from "@/schemas/companySchema";
import { Company } from "../types/company";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Button, Form, Modal, Spinner } from "react-bootstrap";

interface Props {
    show: boolean;
    company: Company | null;
    onClose: () => void;
    onSave: (id: string, data: Partial<Company>,) => Promise<void>;
}

export default function CompanyEditModal({ show, company, onClose, onSave, }: Props) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting, },
    } = useForm<CompanyEditFormData>({
        resolver: zodResolver(companyEditSchema),
    });

    useEffect(() => {
        if (company) {
            reset({
                companyName: company.companyName,
                companyCode: company.companyCode,
            });
        }
    }, [company, reset]);

    async function submit(data: CompanyEditFormData) {
        try {
            if (!company) return;

            await onSave(company.id, data);
            onClose();
        } catch (error) {
            console.error(error);
        } finally {
            reset();
        }
    }

    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Edit Company</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit(submit)}>
                    <Form.Group className="mb-3">
                        <Form.Label>Company Name</Form.Label>
                        <Form.Control {...register("companyName")} />
                        <small className="text-danger">{errors.companyName?.message}</small>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Company Code</Form.Label>
                        <Form.Control {...register("companyCode")} />
                        <small className="text-danger">{errors.companyCode?.message}</small>
                    </Form.Group>

                    <div className="mt-4 d-flex justify-content-end">
                        <Button variant="secondary" className="me-2" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting
                                ? <Spinner animation="border" size="sm" />
                                : "Save"
                            }
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
}