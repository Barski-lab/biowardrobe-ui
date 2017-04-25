export function paginationParams(tableParams){
    return {
        page: tableParams.pagination.pageNum ,
        entries: tableParams.pagination.entries,
        sorting: tableParams.sorting,
        filtering: tableParams.filtering,
        pagination: true
    };
}