import BN from 'bn.js'
import { BetterDAO } from '../type'
import { getDAOContract, getFactoryContract } from './wallet'
import _ from 'lodash'
import router from 'next/router'
import { CONTRACT_NAME } from './config'

export const createDAO = async (dao: BetterDAO) => {
  try {
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
    console.log('--- created ---')
    router.push(`/dao/${dao.name}.${CONTRACT_NAME}`)
  } catch (error) {
    console.log(error)
  }
}

export const deleteDAO = async (daoAddress: string) => {
  try {
    const contract = (await getFactoryContract()) as any
    await contract.deleteDAO({ name: daoAddress })
  } catch (error) {
    console.log(error)
  }
}

export const createFeedback = async (daoAddress: string, feedback: any) => {
  try {
    const contract = (await getDAOContract(daoAddress)) as any
    await contract.createFeedback(feedback)
  } catch (error) {}
}

export const likeFeedback = async (daoAddress: string, feedbackId: number) => {
  try {
    const contract = (await getDAOContract(daoAddress)) as any
    await contract.likeFeedback({ id: feedbackId })
  } catch (error) {
    throw error
  }
}
