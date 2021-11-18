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

export const createFeedback = async (daoAddress: string, issue: any) => {
  const contract = (await getDAOContract(daoAddress)) as any
  await contract.createFeedback(issue)
}

export const likeFeedback = async (daoAddress: string, feedbackId: number) => {
  const contract = (await getDAOContract(daoAddress)) as any
  await contract.likeFeedback({ id: feedbackId })
}

export const acceptFeedback = async (
  daoAddress: string,
  feedbackId: number
) => {
  const contract = (await getDAOContract(daoAddress)) as any
  await contract.acceptFeedback({ id: feedbackId })
}

export const rejectFeedback = async (
  daoAddress: string,
  feedbackId: number
) => {
  const contract = (await getDAOContract(daoAddress)) as any
  await contract.rejectFeedback({ id: feedbackId })
}

export const startFeedback = async (daoAddress: string, feedbackId: number) => {
  const contract = (await getDAOContract(daoAddress)) as any
  await contract.startFeedback({ id: feedbackId })
}

export const completeFeedback = async (
  daoAddress: string,
  feedbackId: number
) => {
  const contract = (await getDAOContract(daoAddress)) as any
  await contract.completeFeedback({ id: feedbackId })
}
