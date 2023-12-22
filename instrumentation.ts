import { dbConnect } from "./utils/db"

const connectToDatabase = async () => {
  try {
    await dbConnect()
    console.log("Connected to the database")
  } catch (error) {
    console.error("Error connecting to the database:", error)
  }
}

connectToDatabase()
