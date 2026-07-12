import { useTickets } from "@/contexts/TicketContext";

export default function TicketsPage() {

    const { tickets } = useTickets();

    return (

        <div>
            <h2>Tickets</h2>
            {tickets.length > 0 ? (
                tickets.map((ticket: any) => (
                    <div key={ticket.id}>
                        <h3>{ticket.title}</h3>
                        <p>{ticket.rawText}</p>
                    </div>
                ))
            ) : (
                <p>No tickets available.</p>
            )}
        </div>
    );
}