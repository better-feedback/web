import * as githubApi from 'api-routes/lib/github/api'
import {
  getMetadataAndCleanedComment,
  setMetadataComment,
  buildMetadataInfoText,
} from 'api-routes/lib/github/utils'
import { ApiError } from 'api-routes/lib/error'

import type { NextApiRequest, NextApiResponse } from 'next'

type PostBody = {
  issueNumber: number
  chain: string
  bountyId: number
}

type Data = {
  message?: string
  error?: any
}

/**
 * `POST /proposal`
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const requiredPostBodyKeys = ['issueNumber', 'chain', 'bountyId']
  const postBody: PostBody = req.body

  Object.keys(postBody).forEach((postBodyKey) => {
    if (!requiredPostBodyKeys.includes(postBodyKey)) {
      throw new ApiError(
        400,
        `Required POST body keys: ${requiredPostBodyKeys}`
      )
    }
  })

  const metadataComment = await githubApi.getMetadataComment(
    postBody.issueNumber
  )
  const { metadata } = getMetadataAndCleanedComment(metadataComment?.body || '')

  const updatedMetadata = {
    ...metadata,
    bounties: [
      ...metadata.bounties,
      {
        chain: postBody.chain,
        bountyId: postBody.bountyId,
      },
    ],
  }

  const newMetadataCommentBody = setMetadataComment(
    buildMetadataInfoText(updatedMetadata),
    updatedMetadata
  )

  await githubApi.upsertMetadataComment({
    metadataCommentBody: newMetadataCommentBody,
    issueNumber: postBody.issueNumber,
    metadataCommentId: metadataComment?.id,
  })

  res.status(200).json({ message: 'OK' })
}
