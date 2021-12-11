import * as githubApi from 'api-routes/lib/github/api'
import { getMetadataAndCleanedComment } from 'api-routes/lib/github/utils'
import { ApiError, apiErrorHandler } from 'api-routes/lib/error'

import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  issue?: any
  error?: any
}

/**
 * `GET /issue/:issueId`
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    if (req.method !== 'GET') {
      throw new ApiError(400, `Method ${req.method} not allowed`)
    }

    const githubIssue = await githubApi.getIssueByNumber(
      Number(req.query.issueNumber as string)
    )
    const metadataComment = await githubApi.getMetadataComment(
      githubIssue.number
    )
    const { metadata, cleanedComment } = getMetadataAndCleanedComment(
      metadataComment ? metadataComment?.body || '' : ''
    )

    return res.status(200).json({
      issue: {
        ...githubIssue,
        metadataComment,
        cleanedComment,
        metadata,
      },
    })
  } catch (error) {
    apiErrorHandler(res, error)
  }
}
