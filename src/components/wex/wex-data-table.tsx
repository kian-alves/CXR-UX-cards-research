import {
  DataTable,
  DataTableColumnHeader,
  DataTableViewOptions,
  DataTablePagination,
  DataTableRowActions,
} from "@/components/ui/data-table";

/**
 * WexDataTable - WEX Design System Data Table Component
 *
 * Advanced table component with sorting, filtering, pagination, and column visibility.
 * Built on top of @tanstack/react-table.
 *
 * @example
 * const columns: ColumnDef<Data>[] = [
 *   {
 *     accessorKey: "name",
 *     header: ({ column }) => (
 *       <WexDataTable.ColumnHeader column={column} title="Name" />
 *     ),
 *   },
 * ];
 *
 * <WexDataTable columns={columns} data={data} searchKey="name" />
 */

export const WexDataTable = DataTable;
export const WexDataTableColumnHeader = DataTableColumnHeader;
export const WexDataTableViewOptions = DataTableViewOptions;
export const WexDataTablePagination = DataTablePagination;
export const WexDataTableRowActions = DataTableRowActions;

