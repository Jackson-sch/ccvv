import Card, { CardContent } from "@/components/Card";
import PageTitle from "@/components/PageTitle";
import BarChartTurno from "@/components/incidencia/BarChartTurno";
import BarChart from "@/components/ui/dashboard/BarChart";
import SalesCard from "@/components/ui/dashboard/SalesCard";
import { DollarSign, Users, CreditCard, Activity } from "lucide-react";

export default function page() {
  return (
    <div className="flex flex-col gap-5 w-full">
      <PageTitle title="Dashboard" />
      <section className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-4">
        {cardData.map((card, index) => (
          <Card key={index} {...card} />
        ))}
      </section>

      <section className="grid grid-cols-1 gap-4 transition-all lg:grid-cols-2">
        <CardContent>
          <p className="text-sm">Total Revenue</p>
          <BarChart />
        </CardContent>
        <CardContent>
          <p className="text-sm">Incidencias por Turno</p>
          <BarChartTurno />
        </CardContent>
        <CardContent>
          <section>
            <p className="text-sm">Recent Sales</p>
            <p>You made 265 sales this month</p>
          </section>
          {userSalesData.map((d, index) =>(
            <SalesCard key={index} d={d} />
          ))}
        </CardContent>
      </section>
    </div>
  );
}

const cardData = [
  {
    label: "Total Revenue",
    amount: "$45,231.89",
    discription: "+20.1% from last month",
    icon: DollarSign,
  },
  {
    label: "Subscriptions",
    amount: "+2350",
    discription: "+180.1% from last month",
    icon: Users,
  },
  {
    label: "Sales",
    amount: "+12,234",
    discription: "+19% from last month",
    icon: CreditCard,
  },
  {
    label: "Active Now",
    amount: "+573",
    discription: "+201 since last hour",
    icon: Activity,
  },
];


const userSalesData = [
  {
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    saleAmount: "+$1,999.00"
  },
  {
    name: "Jackson Lee",
    email: "isabella.nguyen@email.com",
    saleAmount: "+$1,999.00"
  },
  {
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    saleAmount: "+$39.00"
  },
  {
    name: "William Kim",
    email: "will@email.com",
    saleAmount: "+$299.00"
  },
  {
    name: "Sofia Davis",
    email: "sofia.davis@email.com",
    saleAmount: "+$39.00"
  }
];