export type TUserItem = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  updatedAt: string;
};

export type TUsersApiResponse = {
  users: TUserItem[];
  pageCount: number;
};

export function isUsersApiResponse(arg: unknown): arg is TUsersApiResponse {
  const resp = arg as TUsersApiResponse;

  return typeof resp.pageCount === "number" && Array.isArray(resp.users);
}
