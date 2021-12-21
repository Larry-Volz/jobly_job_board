"use strict"; 

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");


class Job {
    /** Create a job (from data), update db, return new company data.
     *
     * input data should be { title, salary, equity, companyHandle }
     *
     * Returns { id, title, salary, equity, companyHandle  }
     *
     * Throws BadRequestError if job already in database.
     * */

    static async create({ title, salary, equity, companyHandle}) {
        const duplicateCheck = await db.query(
            `SELECT company_handle
            FROM jobs
            WHERE company_handle = $1`,
            [companyHandle]);        
            
        if (duplicateCheck.rows[0])
            throw new BadRequestError(`Duplicate company: ${companyHandle}`);
            
        const result = await db.query(
            `INSERT INTO jobs
                (title, salary, equity, company_handle)
                VALUES ($1, $2, $3, $4)
                RETURNING id, title, salary, equity, company_handle AS companyHandle`,
            [
            title, 
            salary, 
            equity, 
            companyHandle
            ],
        );
        const job = result.rows[0];
    
        return job;
            
    }


    /** Find all jobs.
   *
   * Returns [{ _______ }, ...]
   * */




    /** Given a job id, return data about job.
   *
   * Returns { ____ }
   *
   * Throws NotFoundError if not found.
   **/



    /** Update job data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain all the
   * fields; this only changes provided ones.
   *
   * Data can include: {____}
   *
   * Returns {  _____}
   *
   * Throws NotFoundError if not found.
   */




    /** Delete given job from database; returns undefined.
   *
   * Throws NotFoundError if company not found.
   **/



}


module.exports = Job;