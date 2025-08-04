"use client";

import BarChartComponent from "@/components/charts/barcharts";
import { ChartBarInteractiveComponent } from "@/components/charts/chart-bar-interactive";
import { ChartLineDefaultComponent } from "@/components/charts/chartLineDefault";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

export const description = "A multiple bar chart";

export default function Home() {
  return (
    <main className="w-full p-10">
      <div className="grid grid-cols-4 gap-5">
        <Card className="">
          <CardHeader>
            <CardDescription>Total de vendas</CardDescription>
            <CardTitle className="text-2xl">R$ 1.000</CardTitle>
            <CardAction>
              <Badge variant="outline">
                <TrendingUp />
                +5%
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="flex  gap-2">
              Trending up this month
              <TrendingUp />
            </div>
            <div className="text-sm text-gray-500">
              Visitors for the last 3 months
            </div>
          </CardFooter>
        </Card>

        <Card className="">
          <CardHeader>
            <CardDescription>New Customers</CardDescription>
            <CardTitle className="text-2xl">1,350</CardTitle>
            <CardAction>
              <Badge variant="outline">
                <TrendingUp />
                +5%
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="flex  gap-2">
              Trending up this month
              <TrendingUp />
            </div>
            <div className="text-sm text-gray-500">
              Visitors for the last 3 months
            </div>
          </CardFooter>
        </Card>

        <Card className="">
          <CardHeader>
            <CardDescription>Active Accounts</CardDescription>
            <CardTitle className="text-2xl">45,000</CardTitle>
            <CardAction>
              <Badge variant="outline">
                <TrendingUp />
                +5%
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="flex  gap-2">
              Trending up this month
              <TrendingUp />
            </div>
            <div className="text-sm text-gray-500">
              Visitors for the last 3 months
            </div>
          </CardFooter>
        </Card>

        <Card className="">
          <CardHeader>
            <CardDescription>Growth Rate</CardDescription>
            <CardTitle className="text-2xl">4,5%</CardTitle>
            <CardAction>
              <Badge variant="outline">
                <TrendingUp />
                +5%
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="flex  gap-2">
              Trending up this month
              <TrendingUp />
            </div>
            <div className="text-sm text-gray-500">
              Visitors for the last 3 months
            </div>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-10 hidden xl:block">
        <ChartBarInteractiveComponent />
      </div>
    </main>
  );
}
