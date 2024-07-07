"use client"

import * as React from "react"
import type { DataTableFilterField } from "@/types/table"

import { useDataTable } from "@/hooks/use-table"
import { DataTable } from "../table"
import { getColumns } from "./columns"
import { DataTableToolbar } from "../table/toolbar"
import { ExtMute, GetMutes } from "@/server/mutes"

interface MutesTableProps {
    mutesPromise: ReturnType<typeof GetMutes>
    is_admin?: boolean
}

export function MutesTable({ mutesPromise, is_admin }: MutesTableProps) {

    const { data, count } = React.use(mutesPromise)

    // Memoize the columns so they don't re-render on every render
    const columns = React.useMemo(() => getColumns({ is_admin: is_admin! }), [is_admin])

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
    const filterFields: DataTableFilterField<ExtMute>[] = [
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