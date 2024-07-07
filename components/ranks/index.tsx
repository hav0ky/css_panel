"use client"

import * as React from "react"
import type { DataTableFilterField } from "@/types/table"

import { useDataTable } from "@/hooks/use-table"
import { DataTable } from "../table"
import { getColumns } from "./columns"
import { DataTableToolbar } from "../table/toolbar"
import { ExtRank, GetRanks } from "@/server/ranks"

interface RanksTableProps {
    ranksPromise: ReturnType<typeof GetRanks>
}

export function RanksTable({ ranksPromise }: RanksTableProps) {

    const { data, count } = React.use(ranksPromise)

    // Memoize the columns so they don't re-render on every render
    const columns = React.useMemo(() => getColumns(), [])

    /**
     * This component can render either a faceted filter or a search filter based on the `options` prop.
     *
     * @prop options - An array of objects, each representing a filter option. If provided, a faceted filter is rendered. If not, a search filter is rendered.
     *
     * Each `option` object has the following properties:
     * @prop {string} label - The label for the filter option.
     * @prop {string} value - The value for the filter option.
     * @prop {React.ReactNode} [icon] - An optional icon to display next to the label.
     * @prop {boolean} [withCount] - An optional boolean to display the count of the filter option.
     */
    const filterFields: DataTableFilterField<ExtRank>[] = [
        {
            label: "Player Name",
            value: "player_name",
            placeholder: "Filter players...",
        }
    ]

    const { table } = useDataTable({
        data,
        columns,
        pageCount: count,
        // optional props
        filterFields,
        defaultPerPage: 10,
        // defaultSort: "createdAt.desc",
    })

    return (
        <DataTable
            table={table}
        >
            <DataTableToolbar table={table} filterFields={filterFields}>
                {/* <TasksTableToolbarActions table={table} /> */}
            </DataTableToolbar>
        </DataTable>
    )
}