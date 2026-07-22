import { useKnowledgeContext } from "../context/KnowledgeContext";
import Form from "react-bootstrap/Form";

export default function SortKnowledge() {
    const {
        sort,
        setSort,
    } = useKnowledgeContext();

    return (
        <Form.Select value={sort} onChange={(e) => setSort(e.target.value as "newest" | "oldest")}>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
        </Form.Select>
    );
}