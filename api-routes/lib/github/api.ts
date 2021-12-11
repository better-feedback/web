import { Octokit } from 'octokit'

import { getGitHubConfig } from 'utils/config'
import { metadataCommentRegex } from './utils'

import type { ReqParams } from 'api-routes/types'

const githubConfig = getGitHubConfig()

const octokit = new Octokit({ auth: githubConfig.pat })

export async function getIssues(reqParams: ReqParams = {}) {
  const { data = [] } = await octokit.rest.issues.listForRepo({
    owner: githubConfig.repoOwner,
    repo: githubConfig.repoName,
    labels: githubConfig.betterIssueLabel,
    per_page: reqParams.perPage,
    page: reqParams.page,
  })

  return data
}

export async function getIssueByNumber(issueNumber: number) {
  const { data } = await octokit.rest.issues.get({
    owner: githubConfig.repoOwner,
    repo: githubConfig.repoName,
    issue_number: issueNumber,
  })

  return data
}

export async function upsertMetadataComment(params: {
  metadataCommentBody: string
  issueNumber: number
  metadataCommentId?: number
}) {
  if (!params.metadataCommentId) {
    await octokit.rest.issues.createComment({
      owner: githubConfig.repoOwner,
      repo: githubConfig.repoName,
      issue_number: params.issueNumber,
      body: params.metadataCommentBody,
    })
  } else {
    await octokit.rest.issues.updateComment({
      owner: githubConfig.repoOwner,
      repo: githubConfig.repoName,
      issue_number: params.issueNumber,
      comment_id: params.metadataCommentId as number,
      body: params.metadataCommentBody,
    })
  }
  return true
}

export async function updateMetadataComment() {}

export async function getMetadataComment(issueNumber: number) {
  const { data = [] } = await octokit.rest.issues.listComments({
    owner: githubConfig.repoOwner,
    repo: githubConfig.repoName,
    issue_number: issueNumber,
  })

  const metadataComment = data.find((comment) => {
    const match = comment.body?.match(metadataCommentRegex)
    return Boolean(match)
  })

  return metadataComment
}
