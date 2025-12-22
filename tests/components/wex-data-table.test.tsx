/**
 * WexDataTable Component Tests
 */

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { WexDataTable } from "@/components/wex";
import type { ColumnDef } from "@tanstack/react-table";

type TestData = {
  id: string;
  name: string;
  value: number;
};

describe("WexDataTable", () => {
  const columns: ColumnDef<TestData>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "value",
      header: "Value",
    },
  ];

  const data: TestData[] = [
    { id: "1", name: "Item 1", value: 100 },
    { id: "2", name: "Item 2", value: 200 },
  ];

  it("renders table without crashing", () => {
    render(
      <WexDataTable
        columns={columns}
        data={data}
      />
    );
    expect(screen.getByRole("table")).toBeInTheDocument();
  });

  it("displays data rows", () => {
    render(
      <WexDataTable
        columns={columns}
        data={data}
      />
    );
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
  });

  it("shows search input when searchKey is provided", () => {
    render(
      <WexDataTable
        columns={columns}
        data={data}
        searchKey="name"
      />
    );
    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
  });

  it("shows no results message when data is empty", () => {
    render(
      <WexDataTable
        columns={columns}
        data={[]}
      />
    );
    expect(screen.getByText("No results.")).toBeInTheDocument();
  });
});

