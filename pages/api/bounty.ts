import handlePostMeta from 'api-routes/handlers/bounties/post-meta'
import { ApiError, apiErrorHandler } from 'api-routes/lib/error'

import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  message?: any
  error?: any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    switch (req.method) {
      /**
       * `POST /bounty`
       */
      case 'POST':
        return handlePostMeta(req, res)
      default:
        throw new ApiError(400, `Method ${req.method} not allowed`)
    }
  } catch (error) {
    apiErrorHandler(res, error)
  }
}
