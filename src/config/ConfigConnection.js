import "reflect-metadata";
import { DataSource } from "typeorm";
import CompanyModel from "../models/CompanyModel.js";
import DepartmentModel from "../models/DepartmentModel.js";
import InventoryModel from "../models/InventoryModel.js";
import DocumentModel from "../models/DocumentModel.js";
import StatusModel from "../models/StatusModel.js";
import TypeModel from "../models/TypeModel.js";
import CabinetModel from "../models/CabinetModel.js";
import Staff from "../models/StaffModel.js"
import DrawerModel from "../models/DrawerModel.js";
const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "macbook",
  password: "1206",
  database: "quanlyhoso",
  entities: [CompanyModel, 
            DepartmentModel, 
            InventoryModel, 
            DocumentModel, 
            StatusModel, 
            Staff, 
            TypeModel, 
            DrawerModel, 
            CabinetModel],
  synchronize: true,
  logging: false,
});

// to initialize initial connection with the database, register all entities
// and "synchronize" database schema, call "initialize()" method of a newly created database
// once in your application bootstrap
async function connection() {
  try {
    await AppDataSource.initialize();
    console.log("Connect successfully");
  } catch (e) {
    console.log("Connect to database error:" + e.message);
  }
}
export { connection };
export default AppDataSource;