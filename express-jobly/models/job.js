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
     * DONE
     * */

    static async create({ title, salary, equity, companyHandle}) {
        const result = await db.query(
            `INSERT INTO jobs
                (title, salary, equity, company_handle)
                VALUES ($1, $2, $3, $4)
                RETURNING id, title, salary, equity, company_handle AS "companyHandle"`,
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
   * TODO:
   * Returns [{ _______ }, ...]
   * */
     static async findAll(_queries = {}) {
        let query = `SELECT 
                        j.id, 
                        j.title, 
                        j.salary, 
                        j.equity, 
                        j.company_handle AS "companyHandle",
                        c.name AS "companyName"
                    FROM jobs j
                    LEFT JOIN companies AS c ON c.handle = j.company_handle`
        
        let wheres = [];
        let parameterizers = [];
        let queryLength=0;
        
        const { title, minSalary, hasEquity } = _queries;
        
        if (minSalary !== undefined){
          queryLength++;
          parameterizers.push(minSalary);
          wheres.push(`salary >= $${queryLength}`)
        }
    
        if (hasEquity === true){
          queryLength++;
          parameterizers.push(`equity > 0`)
        }
    
        if (title){
          queryLength++;
          parameterizers.push(`%${title}%`);
          wheres.push(`title ILIKE $${queryLength}`)
        }
        
        //TODO: should this be for (ea of wheres)?  or .map()?
        if (queryLength > 0) {
          query += " WHERE " + wheres.join(" AND ");
        }
    
        query += " ORDER BY title";
        
        const jobRes = await db.query(query, parameterizers);
        return jobRes.rows;
      }



    /** Given a job id, return data about job.
   *
   * TODO:
   * Returns { ____ }
   *
   * Throws NotFoundError if not found.
   **/



    /** Update job data with `data`.
   *
   * TODO:
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
   * TODO:
   * Throws NotFoundError if company not found.
   **/



}


module.exports = Job;