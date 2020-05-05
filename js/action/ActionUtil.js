export function headleData(actionType, dispatch, storeName, data, pageSize) {

    let fixItems = [];
    if (data && data.data) {
        if (Array.isArray(data.data)) {
            fixItems = data.data
        } else if (Array.isArray(data.data.items)) {
            fixItems = data.data.items
        }

    }

    dispatch({
        items: fixItems,
        type: actionType,
        projectModes: pageSize > fixItems.length ? fixItems : fixItems.slice(0, pageSize),
        storeName,
        pageIndex: 1
    })


}