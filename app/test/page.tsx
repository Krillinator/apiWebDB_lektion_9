import { User } from "@/utils/types/user"
import { ChangeEvent, useState } from "react"

export default function Page() {
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    age: 0,
  })

  const handleChange = (changeEvent: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [changeEvent.target.name]: changeEvent.target.value })
  }

  const handleSubmit = () => {
    fetch("/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
  }

  return (
    <main>
      <header>
        <h1>Welcome to the test forms</h1>
      </header>

      <body>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            placeholder="username"
            onChange={handleChange}
            value={user.name}
            required
          />

          <label htmlFor="username">Username:</label>
          <input
            type="text"
            placeholder="username"
            onChange={handleChange}
            value={user.name}
            required
          />
        </form>
      </body>
    </main>
  )
}
