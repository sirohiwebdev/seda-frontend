/**
 * Clean-up of API response
 *
 * Filtering out invalid keys, turning array values into concatenated strings and
 * converting boolean values to readable text values
 *
 * @param {Object} data
 * @returns {Object}
 */
const filterData = (data, colMap) => {
  const allowedKeys = Object.keys(colMap);

  return data.map(item =>
    Object.keys(item)
      .filter(key => allowedKeys.includes(key))
      .reduce((rawObj, key) => {
        console.log(key);
        const obj = { ...rawObj };
        let value = item[key];

        if (typeof value === 'boolean') {
          value = value ? 'Actief' : 'Niet actief';
        }

        if (key == 'profile') {
          let dep = item[key].departments;
          value = dep.join(',');
        }

        obj[colMap[key]] = value;

        return obj;
      }, {})
  );
};

export default filterData;
