"use strict"; 
const request = require("supertest");
const app = require("../app");

const db = require("../db.js");
const { BadRequestError, NotFoundError } = require("../expressError");
const Job = require("./job.js");
const {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);



/**
 * TODO:
 * Test Create
 */
 describe("create", function () {
    const newJob = {
        title: "New job",
        salary: 60000,
        equity: "0.1",
        companyHandle: "c1",
    };
  
    test("works", async function () {
        let job = await Job.create(newJob);
        //NOTE: ...newJob expands it
        expect(job).toEqual({
            ...newJob,
            id: expect.any(Number)
        });
  
    const result = await db.query(
        `SELECT id, title, salary, equity, company_handle
            FROM jobs
            WHERE id = ${job.id}`);
      expect(result.rows).toEqual([
        {
            id: job.id,
            title: "New job",
            salary: 60000,
            equity: "0.1",
            company_handle: "c1",
        },
      ]);
    });
  

  });

/**
 * TODO:
 * Test Read
 */
 describe("findAll", function () {
    test("basic search with no filter", async function () {
      let jobs = await Job.findAll();
      expect(jobs).toEqual([
        {
            id: expect.any(Number),
            title: "J1",
            salary: 60000,
            equity: "0.1",
            companyHandle: "c1",
            companyName: "C1"
        },
        {
            id: expect.any(Number),
            title: "J2",
            salary: 100000,
            equity: "0.2",
            companyHandle: "c2",
            companyName: "C2"
        },
        {
            id: expect.any(Number),
            title: "J3",
            salary: 200000,
            equity: "0.3",
            companyHandle: "c2",
            companyName: "C2"
        }

      ]);
    });
});


/**
 * TODO:
 * Test Update
 */



/** 
 * TODO:
 * Test Delete 
 * */