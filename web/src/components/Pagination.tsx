import BSPagination from "react-bootstrap/Pagination";

export type PaginationProps = {
  pageCount: number;
  currPage: number;
  pagesToShow: number;
  hrefBuilder: (page: number) => string;
};

function Pagination({ pageCount, currPage, pagesToShow, hrefBuilder }: PaginationProps) {
  const middlePage = Math.floor(pagesToShow / 2);
  const startPage =
    currPage + middlePage > pageCount ? pageCount - pagesToShow + 1 : Math.max(currPage - middlePage, 1);
  const endPage = Math.min(startPage + pagesToShow - 1, pageCount);
  const isFirstPage = currPage === 1;
  const isLastPage = currPage === pageCount;

  return (
    <BSPagination>
      <BSPagination.First href={hrefBuilder(1)} disabled={isFirstPage} />
      <BSPagination.Prev href={hrefBuilder(Math.max(currPage - 1, 1))} disabled={isFirstPage} />

      {Array.from({ length: endPage - startPage + 1 }, (_, i) => (
        <BSPagination.Item key={startPage + i} href={hrefBuilder(startPage + i)} active={currPage === startPage + i}>
          {startPage + i}
        </BSPagination.Item>
      ))}

      <BSPagination.Next href={hrefBuilder(Math.min(currPage + 1, pageCount))} disabled={isLastPage} />
      <BSPagination.Last href={hrefBuilder(pageCount)} disabled={isLastPage} />
    </BSPagination>
  );
}

export default Pagination;
