
// Generate an update query set string, based on keys in object
// Example usage `UPDATE pages SET ${__updateSetQueryGen(obj)} WHERE _id='${_id}'`;
export const __updateSetQueryGen = (obj: any) => {
    // key=${key},
    let queryValuesStr = '';
    let notFirst = false;
    for (const key in obj) {
        let comma = notFirst ? ', ' : '';
        notFirst = true;
        queryValuesStr += comma + key +'='+'${'+key+'}';
    }
    return queryValuesStr;
}