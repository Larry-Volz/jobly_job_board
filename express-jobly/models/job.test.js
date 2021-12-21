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
        expect(job).toEqual({
            ...newJob,
            id:expect.any(Number)
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



/**
 * TODO:
 * Test Update
 */



/** 
 * TODO:
 * Test Delete 
 * */