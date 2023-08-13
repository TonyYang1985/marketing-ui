"use client";

import { Card, Metric, Text, Title, BarList, Flex, Grid } from '@tremor/react';
import Chart from '@/src/components/playground/chart';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

export const dynamic = 'force-dynamic';
const list = [
  {
    category: 'Website',
    stat: '10,234',
    data: [
      { name: '/home', value: 1230 },
      { name: '/contact', value: 751 },
      { name: '/gallery', value: 471 },
      { name: '/august-discount-offer', value: 280 },
      { name: '/case-studies', value: 78 }
    ]
  },
  {
    category: 'Online Shop',
    stat: '12,543',
    data: [
      { name: '/home', value: 453 },
      { name: '/imprint', value: 351 },
      { name: '/shop', value: 271 },
      { name: '/pricing', value: 191 }
    ]
  },
  {
    category: 'Mobile App',
    stat: '2,543',
    data: [
      { name: '/shop', value: 789 },
      { name: '/product-features', value: 676 },
      { name: '/about', value: 564 },
      { name: '/login', value: 234 },
      { name: '/downloads', value: 191 }
    ]
  }
];



export default function IndexPage() {
  const { data: session } = useSession();
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
       <h1>Client Session</h1>
       <pre>{JSON.stringify(session)}</pre>

      <Grid numItemsSm={2} numItemsLg={3} className="gap-6">
        {list.map((item) => (
          <Card key={item.category}>
            <Title>{item.category}</Title>
            <Flex
              justifyContent="start"
              alignItems="baseline"
              className="space-x-2"
            >
              <Metric>{item.stat}</Metric>
              <Text>Total views</Text>
            </Flex>
            <Flex className="mt-6">
              <Text>Pages</Text>
              <Text className="text-right">Views</Text>
            </Flex>

            <BarList
              data={item.data}
              valueFormatter={(number: number) =>
                Intl.NumberFormat('us').format(number).toString()
              }
              className="mt-2"
            />
          </Card>
        ))}
      </Grid>
      <Chart />
    </main>
  );
}