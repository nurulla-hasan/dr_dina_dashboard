import PageLayout from "@/components/common/page-layout";
import {
  ticketsColumns,
  type Ticket,
} from "@/components/management/tickets/tickets-columns";
import { TicketsFilter } from "@/components/management/tickets/tickets-filter";
import { DataTable } from "@/components/ui/data-table";
import PageHeader from "@/components/ui/page-header";

const tickets: Ticket[] = [
  {
    id: 1,
    ticketId: "TKT-0001",
    userName: "Hilda Reinger",
    email: "admin@gmail.com",
    date: "2 days ago",
    status: "Completed",
  },
  {
    id: 2,
    ticketId: "TKT-0002",
    userName: "Kerry Trantow",
    email: "admin@gmail.com",
    date: "2 days ago",
    status: "In Progress",
  },
  {
    id: 3,
    ticketId: "TKT-0003",
    userName: "Geneva Pfannerstill",
    email: "admin@gmail.com",
    date: "2 days ago",
    status: "Pending",
  },
  {
    id: 4,
    ticketId: "TKT-0009",
    userName: "Everett Williamson",
    email: "admin@gmail.com",
    date: "2 days ago",
    status: "In Progress",
  },
  {
    id: 5,
    ticketId: "TKT-0011",
    userName: "Tonya Parker",
    email: "admin@gmail.com",
    date: "2 days ago",
    status: "Completed",
  },
  {
    id: 6,
    ticketId: "TKT-0022",
    userName: "Jan Leuschke",
    email: "admin@gmail.com",
    date: "2 days ago",
    status: "In Progress",
  },
];

const meta = {
  total: tickets.length,
  page: 1,
  limit: 10,
  totalPages: Math.ceil(tickets.length / 10),
};

const Tickets = () => {
  return (
    <PageLayout>
      <div className="flex flex-col md:flex-row md:justify-between">
        <PageHeader title="Manage Ticket" description="View and manage all customer tickets" length={tickets.length} />
        <TicketsFilter />
      </div>
      <DataTable columns={ticketsColumns} data={tickets} meta={meta} />
    </PageLayout>
  );
};

export default Tickets;

