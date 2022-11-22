import express, { Request, Response, NextFunction } from 'express'
import 'reflect-metadata'
import cors from 'cors'

import NewRoutes from './routers/new'
import Database from './database/connections/Database'
import { HttpError } from './errors'

export default class Application {
  readonly #express: express.Application

  constructor() {
    this.#express = express()
  }

  async init() {
    this.config()
    this.routers()
    this.errors()
    await this.database()
  }

  start(port: number) {
    this.#express.listen(port, () => {
      console.log(`A aplicação está rodando na porta ${port}...`)
    })
  }

  private config() {
    this.#express.use(express.json())
    this.#express.use(express.urlencoded({ extended: false }))
    this.#express.use(cors())
  }

  private errors() {
    this.#express.use(
      (
        error: HttpError,
        request: Request,
        response: Response,
        next: NextFunction,
      ) => {
        return response.json({
          message: error.message,
        })
      },
    )
  }
  private routers() {
    const newRouter = new NewRoutes().init()

    this.#express.use(newRouter)
  }

  private async database() {
    await Database.getInstance()
  }
}
