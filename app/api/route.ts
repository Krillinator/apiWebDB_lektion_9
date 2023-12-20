import { NextRequest, NextResponse } from "next/server"
import { UserModel } from "@/utils/models/userModel"
import { User } from "@/utils/types/user"

export async function POST(request: NextRequest) {
  try {
    const { name, email, age }: User = await request.json() // Parse JSON from the request body

    // Validate the request body
    if (!name || !email || !age) {
      return Response.json({ message: "Invalid request body" }, { status: 400 })
    }

    // Create a new user using the UserModel
    // TODO - Check datatype
    const newUser = await UserModel.create({ name, email, age })

    return Response.json(
      { message: "User created successfully", user: newUser },
      { status: 201 }
    )
  } catch (error) {
    console.error(error)
    return Response.json({ message: "Error", error }, { status: 500 })
  }
}

export async function GET() {
  const [res]: User[] = await UserModel.find({ email: "benny1123@hotmail.com" })

  return Response.json(
    { res },
    { headers: { "Cache-Control": "max-age=3600" } }
  )
}
