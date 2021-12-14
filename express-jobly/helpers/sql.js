const { BadRequestError } = require("../expressError");

//DONE:THIS NEEDS SOME GREAT DOCUMENTATION.
//TODO: STUDY THIS IN MORE DETAIL
/**
 * 
 * @param {Object} dataToUpdate - Object w/keys to be updated and the values to replace them with.  Key/value pairs vary depending on which method is calling this.  It is used in update methods for auth, user and company.   
 * @param {Object} jsToSql - object of default values that are 
 * @returns  {setCols, [values]}
 * where setCols: a string of commma-separated column names for sql update syntax inclusion
 * values: a array of values parameterized ($1, $2, etc.) for the final part of the class
 */
function 
sqlForPartialUpdate(dataToUpdate, jsToSql) {
  //converts keys in dataToUpdate object into an array keys
  const keys = Object.keys(dataToUpdate);
  if (keys.length === 0) throw new BadRequestError("No data");

  // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
  const cols = keys.map((colName, idx) =>

      //jsToSql is data object passed in - so jsToSql[key] yields values=$1-x
      `"${jsToSql[colName] || colName}"=$${idx + 1}`,
  );

  //QUESTION: Why the extra comma?
  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}

module.exports = { sqlForPartialUpdate };
