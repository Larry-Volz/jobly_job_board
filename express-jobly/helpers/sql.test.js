"use strict";

const {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll,
} = require("../models/_testCommon");


beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);


const process = require("process");
process.env.NODE_ENV = "test"

const { sqlForPartialUpdate } = require("./sql")


describe("Should reformat input into sql for different calling functions", () =>{
    test("calling as if from User.update", async function() {

        const data = { firstName:"U1F", lastName:"U1L", email:"email", isAdmin:false };

        const jsToSql = {
            firstName: "first_name",
            lastName: "last_name",
            isAdmin: "is_admin"
          };

        const result = await sqlForPartialUpdate(data, jsToSql);

        expect(result).toEqual({setCols: "\"first_name\"=$1, \"last_name\"=$2, \"email\"=$3, \"is_admin\"=$4", values: ["U1F",  "U1L", "email", false,]})

    })
})

