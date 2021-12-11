import * as githubApi from 'api-routes/lib/github/api'
import { getMetadataAndCleanedComment } from 'api-routes/lib/github/utils'

import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  issues?: any[]
  error?: any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const githubIssues = await githubApi.getIssues({
    page: Number(req.query.page) || 1,
    perPage: Number(req.query.perPage) || 10,
  })

  const githubIssuesWithMetadataComment = await Promise.all(
    githubIssues.map(async (issue) => {
      const metadataComment = await githubApi.getMetadataComment(issue.number)
      return {
        ...issue,
        metadataComment,
      }
    })
  )

  const githubIssuesWithParsedMetadata = githubIssuesWithMetadataComment.map(
    (issueWithMetadataComment) => {
      const { metadata } = getMetadataAndCleanedComment(
        issueWithMetadataComment.metadataComment?.body || ''
      )
      return {
        ...issueWithMetadataComment,
        metadata,
      }
    }
  )

  res.status(200).json({ issues: githubIssuesWithParsedMetadata })
}
