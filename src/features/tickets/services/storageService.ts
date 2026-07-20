import { ref, uploadBytes, getDownloadURL, deleteObject, } from "firebase/storage";
import { storage, } from "@/firebase/firebase";

export async function uploadTicketAttachment(file: File) {
    const fileName = `tickets/${Date.now()}-${file.name}`;
    const storageRef = ref(storage, fileName);

    await uploadBytes(storageRef, file);

    return await getDownloadURL(storageRef);
}

export async function deleteTicketAttachment(attachmentUrl?: string) {
    if (!attachmentUrl) return;

    try {
        const fileRef = ref(storage, attachmentUrl);
        await deleteObject(fileRef);
    } catch (error) {
        console.error("Unable to delete attachment", error);
    }
}