import mongoose from "mongoose"

if (!process.env.MONGODB_URI) {
  throw new Error("No MongoDB URI specified")
}

const uri = process.env.MONGODB_URI

export async function dbConnect(
  retryCount: number = 0
): Promise<typeof mongoose> {
  try {
    const db = await mongoose.connect(uri, {
      autoIndex: true,
      maxPoolSize: 10,
      minPoolSize: 5,
      socketTimeoutMS: 5000,
      family: 4,
      authSource: "admin",
      serverSelectionTimeoutMS: 30000,
      heartbeatFrequencyMS: 10000,
    })

    console.log("Connected to the database")
    return db
  } catch (err) {
    console.error(`Failed to connect to database: ${err}`)

    // Implement retry logic with a maximum retry count
    const maxRetries = 3

    if (retryCount < maxRetries) {
      console.log(`Retrying connection... Attempt ${retryCount + 1}`)
      // Wait for a short period before retrying (you might want to use exponential backoff)
      await new Promise((resolve) => setTimeout(resolve, 2000))
      return dbConnect(retryCount + 1)
    } else {
      console.error(
        `Max retries (${maxRetries}) reached. Unable to connect to the database.`
      )
      throw new Error("Max retries reached. Unable to connect to the database.")
    }
  }
}
