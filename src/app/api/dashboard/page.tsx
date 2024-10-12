import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { notFound } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatPrice } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import DropdownStatus from "@/components/DropdownStatus";

const WEEKLY_GOAL = 500;
const MONTHLY_GOAL = 2000;

const Page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    return notFound();
  }

  console.log("/dashboard/page.tsx: user ", user);

  if (user.email === process.env.ADMIN_EMAIL) {
    const orders = await db.order.findMany({
      where: {
        isPaid: true,
        createdAt: {
          gte: new Date(new Date().setDate(new Date().getDate() - 7)),
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: true,
        shippingAddress: true,
      },
    });

    const lastWeekSum = await db.order.aggregate({
      where: {
        isPaid: true,
        createdAt: {
          gte: new Date(new Date().setDate(new Date().getDate() - 7)),
        },
      },
      _sum: {
        totalPrice: true,
      },
    });
    const lastMonthSum = await db.order.aggregate({
      where: {
        isPaid: true,
        createdAt: {
          gte: new Date(new Date().setDate(new Date().getDate() - 30)),
        },
      },
      _sum: {
        totalPrice: true,
      },
    });

    return (
      <MaxWidthWrapper className="flex min-h-screen w-full pt-12 md:pt-16">
        <div className="mx-auto flex w-full max-w-7xl flex-col sm:gap-4 sm:py-4">
          <div className="flex flex-col gap-16">
            <div className="grid gap-4 sm:grid-cols-2">
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Last week</CardDescription>
                  <CardTitle className="text-4xl">
                    {lastWeekSum._sum.totalPrice === null
                      ? (lastWeekSum._sum.totalPrice = 0)
                      : lastWeekSum._sum.totalPrice}
                    {formatPrice(lastWeekSum._sum.totalPrice)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">
                    of {formatPrice(WEEKLY_GOAL)} goal
                  </div>
                </CardContent>
                <CardFooter>
                  <Progress
                    value={(lastWeekSum._sum.totalPrice * 100) / WEEKLY_GOAL}
                  />
                </CardFooter>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Last month</CardDescription>
                  <CardTitle className="text-4xl">
                    {lastMonthSum._sum.totalPrice === null
                      ? (lastMonthSum._sum.totalPrice = 0)
                      : lastMonthSum._sum.totalPrice}
                    {formatPrice(lastMonthSum._sum.totalPrice)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">
                    of {formatPrice(WEEKLY_GOAL)} goal
                  </div>
                </CardContent>
                <CardFooter>
                  <Progress
                    value={(lastMonthSum._sum.totalPrice * 100) / MONTHLY_GOAL}
                  />
                </CardFooter>
              </Card>
            </div>
            <h1 className="text-4xl font-bold tracking-tight">
              Incoming orders
            </h1>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead className="hidden sm:table-cell">Status</TableHead>
                  <TableHead className="hidden sm:table-cell">
                    Purchase date
                  </TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>
                      <p className="font-medium">
                        {order.shippingAddress?.name}
                      </p>
                      <p className="hidden text-sm text-muted-foreground md:inline">
                        {order.user?.email}
                      </p>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <DropdownStatus
                        orderId={order.id}
                        orderStatus={order.status}
                      />
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {order.createdAt.toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatPrice(order.totalPrice)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </MaxWidthWrapper>
    );
  }

  return notFound();
};

export default Page;
