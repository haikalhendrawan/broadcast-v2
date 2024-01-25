import pool from "../config/db.ts";
import { Request, Response } from "express";
import { ResultSetHeader } from "mysql2";


const addVariable = async(req:Request, res:Response) => {
  const connection = await pool.getConnection();
  try{
    await connection.beginTransaction();
    const variableName = req.body.varName;
    const year = req.body.year;

    const q = `INSERT INTO variable(variable_name) VALUES(?)`;
    const [results] = await pool.execute(q, [variableName]);
    const resultHeader = results as ResultSetHeader;
    const lastId = resultHeader.insertId;

    for(let i=0; i<12; i++){
      const q2 = `INSERT INTO variable_junction(variable, month, year) VALUES(?,?,?)`;
      await pool.execute(q2,[lastId, i, year]);
    }

    await connection.commit();

    return res.status(200).json({message:'insert data success'})
  }catch(err){
    await connection.rollback();
    console.log(err);
    return res.status(500).json({message:'fail insert data', isError:true})
  }finally{
    connection.release();
  }
};

const getVariable = async(req:Request, res:Response) => {
  try{
    const variableId = req.params.id;
    const variableMonth = req.params.month;
    const variableYear = req.params.year;
    const q = `SELECT variable_junction.*, variable.variable_name FROM variable_junction
              LEFT JOIN variable ON variable_junction.variable = variable.id 
              WHERE variable = ? AND month = ? AND year = ?`;
    const [rows] = await pool.execute(q, [variableId, variableMonth, variableYear]);

    return res.status(200).json(rows);
  }catch(err){
    console.log(err);
    return res.status(500).json({message:'fail getting data ', isError:true})
  }
};

const deleteVariable = async(req:Request, res:Response) => {
  try{
    const variableId = req.params.id;
    const q = `DELETE FROM variable WHERE id = ?`;
    await pool.execute(q, [variableId]);

    return res.status(200).json({message:'delete data success'})
  }catch(err){
    console.log(err);
    return res.status(500).json({message:'fail getting data ', isError:true})
  }
};

const editVariable = async(req:Request, res:Response) => {
  try{
    const junctionId = req.body.junctionId;
    const date = req.body.date; 
    const value = req.body.value;

    const q = "UPDATE variable_junction SET`" + date + "`= ? WHERE id = ?";
    await pool.execute(q, [value, junctionId]);

    return res.status(200).json({message:'edit data success'})
  }catch(err){
    console.log(err);
    return res.status(500).json({message:'fail getting data ', isError:true})
  }
};

const getAllVariable = async(req:Request, res:Response) => {
  try{
    const q = `SELECT * FROM variable`;
    const [rows] = await pool.execute(q);

    return res.status(200).json(rows);
  }catch(err){
    console.log(err);
    return res.status(500).json({message:'fail getting data ', isError:true})
  }
};




export {addVariable, getVariable, deleteVariable, editVariable, getAllVariable}