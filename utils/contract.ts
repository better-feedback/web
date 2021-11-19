import BN from 'bn.js'
import { BetterDAO } from '../type'
import { getDAOContract, getFactoryContract } from './wallet'
import _ from 'lodash'
import router from 'next/router'
import { CONTRACT_NAME } from './config'

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
  router.push(`/dao/${dao.name}.${CONTRACT_NAME}`)
}

export const deleteDAO = async (daoAddress: string) => {
  const contract = (await getFactoryContract()) as any
  await contract.deleteDAO({ name: daoAddress })
}

export const createIssue = async (daoAddress: string, issue: any) => {
  const contract = (await getDAOContract(daoAddress)) as any
  await contract.createIssue(issue)
}

export const likeIssue = async (daoAddress: string, feedbackId: number) => {
  const contract = (await getDAOContract(daoAddress)) as any
  await contract.likeIssue({ id: feedbackId })
}

export const approveIssue = async (daoAddress: string, feedbackId: number) => {
  const contract = (await getDAOContract(daoAddress)) as any
  await contract.approveIssue({ id: feedbackId })
}

export const closeIssue = async (daoAddress: string, feedbackId: number) => {
  const contract = (await getDAOContract(daoAddress)) as any
  await contract.closeIssue({ id: feedbackId })
}

export const startIssue = async (daoAddress: string, feedbackId: number) => {
  const contract = (await getDAOContract(daoAddress)) as any
  await contract.startIssue({ id: feedbackId })
}

export const completeIssue = async (daoAddress: string, feedbackId: number) => {
  const contract = (await getDAOContract(daoAddress)) as any
  await contract.completeIssue({ id: feedbackId })
}
