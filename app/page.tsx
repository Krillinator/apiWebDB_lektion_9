"use client"
import { Role, User } from "@/utils/types/user"
import React, { ChangeEvent, FormEvent, useState } from "react"

export default function Page() {
  const [formData, setFormData] = useState<User>({
    name: "Benny",
    email: "benny1123@hotmail.com",
    age: 5,
    roles: [
      { name: "Benny", permissions: "BASIC", authorities: "GET, POST" },
      {
        name: "Frida",
        permissions: "ADMIN",
        authorities: "GET, POST, PUT, DELETE",
      },
    ],
  })

  // Courses
  const [role, setRole] = useState<Role>({
    name: "",
    permissions: "",
    authorities: "",
  })

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target

    setFormData({
      ...formData,
      [name]: value,
    })
  }

  // Personally don't like this
  const handleRoleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newRole: Role = { ...role, [event.target.name]: event.target.value }

    setRole(newRole)
  }

  const handleSubmit = async (event: FormEvent) => {
    // Add new role to formData
    setFormData({ ...formData, roles: [...formData.roles, role] })

    event.preventDefault()

    try {
      const response = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const result = await response.json()
        console.log(result)
        // You can handle success actions here
      } else {
        const error = await response.json()
        console.error(error)
        // You can handle error actions here
      }
    } catch (error) {
      console.error("Error:", error)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="age">Age:</label>
        <input
          type="number"
          id="age"
          name="age"
          placeholder="12"
          value={formData.age}
          onChange={handleChange}
          required
        />

        <label htmlFor="roles">Roles:</label>
        <p>Name</p>

        <select
          value={formData.roles[0].name as string}
          onChange={(e) => {
            setFormData({
              ...formData,
              roles: [{ ...formData.roles[0], name: e.target.value }], // map
            })
          }}
          required
        >
          <option value="" disabled>
            Select Role
          </option>
          <option value="Admin">Admin</option>
          <option value="User">User</option>
          <option value="Guest">Guest</option>
        </select>

        <p>Permissions</p>
        <select
          value={formData.roles[0].permissions.toLocaleLowerCase()}
          name="permissions"
          onChange={(event) => {
            setFormData({
              ...formData,
              roles: [...formData.roles],
            })
          }}
        >
          <option value="Basic">Basic Permissions</option>
          <option value="Admin">Admin Permissions</option>
        </select>

        {/* NEW OBJECT - ROLE */}
        <p>Add Role</p>
        <p>Name</p>
        <input
          type="text"
          name="name"
          placeholder="Admin"
          value={role.name}
          onChange={handleRoleChange}
          required
        />

        <p>Permissions</p>
        <input
          type="text"
          name="permissions"
          placeholder="GET, POST"
          value={role.permissions}
          onChange={handleRoleChange}
          required
        />

        <p>Authorities</p>
        <input
          type="text"
          name="authorities"
          placeholder="BASIC or ADMIN"
          value={role.authorities}
          onChange={handleRoleChange}
          required
        />

        <button type="submit">Submit</button>
      </form>

      <div>
        <p>{JSON.stringify(formData)}</p>
      </div>
    </>
  )
}
