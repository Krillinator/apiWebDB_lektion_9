// instrumentation.ts

import { dbConnect } from "./utils/db"

export async function register() {
  try {
    await dbConnect()
    console.log("Connected to the database")
    // Perform any additional instrumentation logic here
  } catch (error) {
    console.error("Error connecting to the database:", error)
  }
}
