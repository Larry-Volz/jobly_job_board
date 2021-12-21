"use strict"; 

const db = require("../db.js");
const { BadRequestError, NotFoundError } = require("../expressError");
const Job = require("./job.js");
const {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll,
} = require("./_testCommon");

// beforeAll(commonBeforeAll);
// beforeEach(commonBeforeEach);
// afterEach(commonAfterEach);
// afterAll(commonAfterAll);

afterAll(async function() {
    // close db connection
    await db.end();
  });


/**
 * TODO:
 * Test Create
 */
 describe("create", function () {
    const newJob = {
        companyHandle: "bauer-gallagher",
        title: "New job",
        salary: 60000,
        equity: 0.1,
    };
  
    test("works", async function () {
      let job = await Job.create(newJob);
      expect(job.title).toEqual(title);
  
    //   const result = await db.query(
    //         `SELECT handle, name, description, num_employees, logo_url
    //          FROM companies
    //          WHERE handle = 'new'`);
    //   expect(result.rows).toEqual([
    //     {
    //       handle: "new",
    //       name: "New",
    //       description: "New Description",
    //       num_employees: 1,
    //       logo_url: "http://new.img",
    //     },
    //   ]);
    });
  
    // test("bad request with dupe", async function () {
    //   try {
    //     await Company.create(newCompany);
    //     await Company.create(newCompany);
    //     fail();
    //   } catch (err) {
    //     expect(err instanceof BadRequestError).toBeTruthy();
    //   }
    // });
  });

/**
 * TODO:
 * Test Read
 */



/**
 * TODO:
 * Test Update
 */



/** 
 * TODO:
 * Test Delete 
 * */