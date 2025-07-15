"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import { useIsMobile } from "@/hooks/use-mobile";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "An interactive area chart";

const dummyData = [
  { date: "2024-06-01", enrollments: 12 },
  { date: "2024-06-02", enrollments: 23 },
  { date: "2024-06-03", enrollments: 17 },
  { date: "2024-06-04", enrollments: 35 },
  { date: "2024-06-05", enrollments: 28 },
  { date: "2024-06-06", enrollments: 14 },
  { date: "2024-06-07", enrollments: 40 },
  { date: "2024-06-08", enrollments: 19 },
  { date: "2024-06-09", enrollments: 22 },
  { date: "2024-06-10", enrollments: 33 },
  { date: "2024-06-11", enrollments: 26 },
  { date: "2024-06-12", enrollments: 31 },
  { date: "2024-06-13", enrollments: 11 },
  { date: "2024-06-14", enrollments: 29 },
  { date: "2024-06-15", enrollments: 45 },
  { date: "2024-06-16", enrollments: 18 },
  { date: "2024-06-17", enrollments: 25 },
  { date: "2024-06-18", enrollments: 37 },
  { date: "2024-06-19", enrollments: 16 },
  { date: "2024-06-20", enrollments: 30 },
  { date: "2024-06-21", enrollments: 39 },
  { date: "2024-06-22", enrollments: 21 },
  { date: "2024-06-23", enrollments: 34 },
  { date: "2024-06-24", enrollments: 27 },
  { date: "2024-06-25", enrollments: 42 },
  { date: "2024-06-26", enrollments: 24 },
  { date: "2024-06-27", enrollments: 38 },
  { date: "2024-06-28", enrollments: 32 },
  { date: "2024-06-29", enrollments: 20 },
  { date: "2024-06-30", enrollments: 21 },
];

const chartConfig = {
  enrollments: {
    label: "Enrollments",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function ChartAreaInteractive() {
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = React.useState("90d");

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d");
    }
  }, [isMobile]);

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Total Enrollments</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Total Enrollments for the last 30 days: 1200
          </span>
          <span className="@[540px]/card:hidden">Last 30 days: 1200</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            data={dummyData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              interval={"preserveStartEnd"}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  labelFormatter={(value) => {
                    const date = new Date(value);
                    return date.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                />
              }
            />

            <Bar dataKey={"enrollments"} fill="var(--color-enrollments)" />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
