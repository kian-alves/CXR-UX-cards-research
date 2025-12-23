import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationFirst,
  PaginationLast,
  RowsPerPage,
  PageReport,
  JumpToPage,
} from "@/components/ui/pagination";

/**
 * WexPagination - WEX Design System Pagination Component
 *
 * Navigation for multi-page content.
 * Uses namespace pattern: WexPagination.Content, WexPagination.Item, etc.
 *
 * @example
 * <WexPagination>
 *   <WexPagination.Content>
 *     <WexPagination.Item>
 *       <WexPagination.Previous href="#" />
 *     </WexPagination.Item>
 *     <WexPagination.Item>
 *       <WexPagination.Link href="#">1</WexPagination.Link>
 *     </WexPagination.Item>
 *     <WexPagination.Item>
 *       <WexPagination.Link href="#" isActive>2</WexPagination.Link>
 *     </WexPagination.Item>
 *     <WexPagination.Item>
 *       <WexPagination.Next href="#" />
 *     </WexPagination.Item>
 *   </WexPagination.Content>
 * </WexPagination>
 */

export const WexPagination = Object.assign(Pagination, {
  Content: PaginationContent,
  Ellipsis: PaginationEllipsis,
  Item: PaginationItem,
  Link: PaginationLink,
  Next: PaginationNext,
  Previous: PaginationPrevious,
  First: PaginationFirst,
  Last: PaginationLast,
  RowsPerPage: RowsPerPage,
  PageReport: PageReport,
  JumpToPage: JumpToPage,
});

