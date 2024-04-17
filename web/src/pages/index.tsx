import { Inter } from "next/font/google";
import { Alert, Container } from "react-bootstrap";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { TUsersApiResponse, isUsersApiResponse } from "@/types/users";
import UsersTable from "@/components/UsersTable";
import Pagination from "@/components/Pagination";

const inter = Inter({ subsets: ["latin"] });

type TGetServerSideProps = {
  statusCode: number;
  currPage: number;
} & TUsersApiResponse;

export const getServerSideProps = (async (ctx: GetServerSidePropsContext): Promise<{ props: TGetServerSideProps }> => {
  try {
    const { page = "1" } = ctx.query as { page?: string };
    const res = await fetch(`http://localhost:3000/users?page=${page}`, {
      method: "GET",
    });
    const currPage = Number(page);
    const errorProps: TGetServerSideProps = {
      statusCode: res.status,
      users: [],
      pageCount: 0,
      currPage,
    };

    if (!res.ok) {
      return { props: errorProps };
    }

    const response = await res.json();

    if (isUsersApiResponse(response)) {
      return {
        props: {
          statusCode: 200,
          users: response.users,
          pageCount: response.pageCount,
          currPage,
        },
      };
    }

    return {
      props: errorProps,
    };
  } catch {
    return { props: { statusCode: 500, users: [], pageCount: 0, currPage: 0 } };
  }
}) satisfies GetServerSideProps<TGetServerSideProps>;

export default function Home({ statusCode, users, pageCount, currPage }: TGetServerSideProps) {
  if (statusCode !== 200) {
    return <Alert variant={"danger"}>Ошибка {statusCode} при загрузке данных</Alert>;
  }

  if (currPage > pageCount) {
    return <Alert variant={"danger"}>Страницы не существует</Alert>;
  }

  return (
    <main className={inter.className}>
      <Container>
        <h1 className={"mb-5"}>Пользователи</h1>
        <UsersTable users={users} />
        <Pagination
          pageCount={pageCount}
          pagesToShow={10}
          currPage={currPage}
          hrefBuilder={(page) => `/?page=${page}`}
        />
      </Container>
    </main>
  );
}
