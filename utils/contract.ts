import BN from 'bn.js'
import { BetterDAO, ExperienceLevel } from 'type'
import { getDAOContract, getFactoryContract } from './wallet'
import _ from 'lodash'
import router from 'next/router'
import { getContractName } from './config'

export const createDAO = async (dao: BetterDAO) => {
  const contract = (await getFactoryContract()) as any
  const args = Buffer.from(JSON.stringify(_.omit(dao, 'name'))).toString(
    'base64'
  )
  await contract.create(
    {
      name: dao.name,
      args,
    },
    new BN('300000000000000'),
    new BN('0')
  )
  router.push(`/`)
}

export const updateDAO = async (
  daoAddress: string,
  projectUrl: string,
  logoUrl: string,
  description: string,
  categories: string[]
) => {
  const contract = (await getDAOContract(daoAddress)) as any
  await contract.updateDAO({
    projectUrl,
    logoUrl,
    description,
    categories,
  })
}

export const deleteDAO = async (daoAddress: string) => {
  const contract = (await getFactoryContract()) as any
  await contract.deleteDAO({ name: daoAddress })
}

export const createIssue = async (daoAddress: string, issue: any) => {
  const contract = (await getDAOContract(daoAddress)) as any
  await contract.createIssue(issue)
}

export const updateIssue = async (daoAddress: string, issue: any) => {
  const contract = (await getDAOContract(daoAddress)) as any
  await contract.updateIssue(issue)
}

export const likeIssue = async (daoAddress: string, issueId: number) => {
  const contract = (await getDAOContract(daoAddress)) as any
  await contract.likeIssue({ id: issueId })
}

export const approveIssue = async (daoAddress: string, issueId: number) => {
  const contract = (await getDAOContract(daoAddress)) as any
  await contract.approveIssue({ id: issueId })
}

export const closeIssue = async (daoAddress: string, issueId: number) => {
  const contract = (await getDAOContract(daoAddress)) as any
  await contract.closeIssue({ id: issueId })
}

export const startIssue = async (daoAddress: string, issueId: number) => {
  const contract = (await getDAOContract(daoAddress)) as any
  await contract.startIssue({ id: issueId })
}

export const completeIssue = async (daoAddress: string, issueId: number) => {
  const contract = (await getDAOContract(daoAddress)) as any
  await contract.completeIssue({ id: issueId })
}

export const issueToBounty = async (
  daoAddress: string,
  issueId: number,
  exLv: ExperienceLevel,
  amount: string
) => {
  const contract = (await getDAOContract(daoAddress)) as any
  await contract.issueToBounty({ id: issueId, exLv, amount })
}

export const addComment = async (
  daoAddress: string,
  issueId: number,
  comment: string
) => {
  const contract = (await getDAOContract(daoAddress)) as any
  await contract.addComment({ id: issueId, comment })
}

export const fundIssue = async (
  daoAddress: string,
  issueId: number,
  amount: string
) => {
  const contract = (await getDAOContract(daoAddress)) as any
  await contract.fundIssue({ id: issueId, amount })
}

export const applyIssue = async (
  daoAddress: string,
  issueId: number,
  message: string
) => {
  const contract = (await getDAOContract(daoAddress)) as any
  await contract.applyIssue({ id: issueId, message })
}

export const approveApplicant = async (
  daoAddress: string,
  issueId: number,
  applicantId: string
) => {
  const contract = (await getDAOContract(daoAddress)) as any
  await contract.approveApplicant({ id: issueId, applicantId })
}

export const revokeApplicant = async (
  daoAddress: string,
  issueId: number,
  applicantId: string
) => {
  const contract = (await getDAOContract(daoAddress)) as any
  await contract.revokeApplicant({ id: issueId, applicantId })
}

export const claimBounty = async (daoAddress: string, issueId: number) => {
  const contract = (await getDAOContract(daoAddress)) as any
  await contract.claimBounty({ id: issueId })
}

export const addCouncilMember = async (
  daoAddress: string,
  accountId: string
) => {
  const contract = (await getDAOContract(daoAddress)) as any
  await contract.addCouncilMember({ account: accountId })
}

export const removeCouncilMember = async (
  daoAddress: string,
  accountId: string
) => {
  const contract = (await getDAOContract(daoAddress)) as any
  await contract.removeCouncilMember({ account: accountId })
}
