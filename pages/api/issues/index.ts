import handleGetIssuesList from 'api-routes/handlers/issues/get-list'
import { ApiError, apiErrorHandler } from 'api-routes/lib/error'

import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  issues?: any[]
  error?: any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    switch (req.method) {
      /**
       * `GET /issues?page=1&perPage=10`
       */
      case 'GET':
        return handleGetIssuesList(req, res)
      default:
        throw new ApiError(400, `Method ${req.method} not allowed`)
    }
  } catch (error) {
    apiErrorHandler(res, error)
  }
}
