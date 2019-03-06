export function columnsFromObject(item: object) {
    // Return columns from item object keys
    const columnsList = [];
    for (const field of Object.keys(item)) {
        const columnItem = {
            Header: field,
            accessor: field
        };
        columnsList.push(columnItem);
    }
    return columnsList;
}
