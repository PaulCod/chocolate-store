import { Request, Response, NextFunction } from "express"
import AuthUserMiddleware from "./AuthUser"
import JwtHandler from "../utils/auth/jwtHandle"

describe("AuthUserMiddleware", () => {
  let authUser: AuthUserMiddleware

  beforeEach(() => {
    authUser = new AuthUserMiddleware()
  })

  it("should return an error if the user is not authenticated", async () => {
    const req = {headers: {authorization: ""}} as unknown as Request
    const next = jest.fn() as NextFunction
    const res = {status: jest.fn().mockReturnThis(), json: jest.fn()} as unknown as Response

    await authUser.authUser(req, res, next)

    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.json).toHaveBeenCalledWith({message: ["Unauthorized"]})
  })

  it("should return an error if token is empty", async () => {
    const req = {headers: {authorization: "Bearer"}} as unknown as Request
    const next = jest.fn() as NextFunction
    const res = {status: jest.fn().mockReturnThis(), json: jest.fn()} as unknown as Response


    jest.spyOn(JwtHandler, "verifyToken").mockReturnValue(false)

    await authUser.authUser(req, res, next)

    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.json).toHaveBeenCalledWith({message: ["Invalid token"]})
  })

  it("should return next if token is valid", async () => {
    const req = {headers: {authorization: "Bearer token"}, body: {userId: ""}} as unknown as Request
    const next = jest.fn() as NextFunction
    const res = {status: jest.fn().mockReturnThis(), json: jest.fn()} as unknown as Response

    await authUser.authUser(req, res, next)

    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.json).toHaveBeenCalledWith({message: ["Unauthorized"]})
  })

  it("should return next if token is valid", async () => {
    const req = {
      headers: {
        authorization:`"Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkMmViMjk4NC0yZTdlLTQyMTItODdiNi1mNWIxZmI1ODQ4NzEiLCJlbWFpbCI6InBhdWxvQGdtYWlsLmNvbSIsImlhdCI6MTcxNjczNjQ5NSwiZXhwIjoxNzE2ODIyODk1fQ.Ip_PqAx-dzhl-fqIIeEhjimFRn5DuejTdbK0DRz_xi2QjE6HDpC7FOGSqsQUas3G0DsMIQZZ5UMXZIaZ3rEnMd1XIK829cyrEykrumOwS6_n19hqdNVVla8wva4MRQ_aO2QeK2ovPSSK9m7dJPlTA6QXP_CzXu3DXiNH44ZxbbPTsAw2d5VcnwRCrCEDb-wx3NIOK3V2z1g9tXYqRlGYAASQkOW2S-RXU0jVj4JA3d0mwDS4eMvrw2ECrZj1KV2YiRJW0be0hz7EytRxrrL7gs3NOYu57VOuIh7C_Z_bkU7NpwFx5xGk-rVcyN79IHRtkyC_aQbOLBH5sR7R769o7w`,
        body: {}
      }} as unknown as Request
    const next = jest.fn() as NextFunction
    const res = {status: jest.fn().mockReturnThis(), json: jest.fn()} as unknown as Response

    jest.spyOn(JwtHandler, "verifyToken").mockReturnValue({userId: "d2eb2984-2e7e-4212-87b6-f5b1fb584871", email: "paulo@gmail.com"})

    await authUser.authUser(req, res, next)

    expect(next).toHaveBeenCalled()
  
  })
})