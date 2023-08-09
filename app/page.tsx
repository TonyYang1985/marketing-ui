import { Card, Title, Text } from '@tremor/react';
import Search from '@/src/components/home/search';
import UsersTable from '@/src/components/home/table';

export const dynamic = 'force-dynamic';

export default async function IndexPage({searchParams}: {searchParams: { q: string }}) {
    const users = [
      {id:1, name:'Lee Robinson',username:'@leerob', email:'lee@vercel.com' },
      {id:2, name:'Leanne Graham',username:'@leanne', email:'leanne@gmail.com' },
      {id:3, name:'Ervin Howell',username:'@ervin', email:'ervin@gmail.com' },
      {id:4, name:'Clementine Bauch',username:'@clementine', email:'clementine@gmail.com' },
      {id:5, name:'Glenna Reichert',username:'@glenna', email:'glenna@gmail.com' }
    ]

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Users</Title>
      <Text>
        A list of users retrieved from a MySQL database (PlanetScale).
      </Text>
      <Search />
      <Card className="mt-6">
        <UsersTable users={users} />
      </Card>
    </main>
  );
}
