import { useEffect, useState } from 'react'
import { BetterDAO } from '../type'
import {
  getDAOContract,
  getDAOState,
  getFactoryContract,
} from '../utils/wallet'

export const useDaoList = (): string[] => {
  const [daoList, setDaoList] = useState<string[]>([])

  useEffect(() => {
    getFactoryContract().then((contract: any) => {
      console.log('--- getDaoList ---', contract)
      contract
        .getDaoList()
        .then((daos: string[]) => {
          setDaoList(daos)
        })
        .catch((err) => {
          console.log(err)
        })
    })
  }, [])
  return daoList
}

export const useDao = (daoAddress: string): BetterDAO | null => {
  const [dao, setDAO] = useState<BetterDAO>(null)
  useEffect(() => {
    console.log(`--- getDAOContract ${daoAddress} ---`)
    if (daoAddress) {
      getDAOContract(daoAddress).then((contract: any) => {
        contract
          .getDAO()
          .then((dao: BetterDAO) => {
            setDAO(dao)
          })
          .catch((err) => {
            console.log(daoAddress, err)
          })
      })
    }
  }, [daoAddress])

  return dao
}

export const useFeedbacks = (daoAddress: string): any[] => {
  const [feedbacks, setFeedbacks] = useState([])

  useEffect(() => {
    if (daoAddress) {
      getDAOContract(daoAddress).then((contract: any) => {
        contract
          .getFeedbacks()
          .then((fbs: any[]) => {
            setFeedbacks(fbs)
          })
          .catch((err) => {
            console.log(daoAddress, err)
          })
      })
    }
  }, [daoAddress])

  return feedbacks
}

export const useFeedback = (daoAddress: string, id: number) => {
  const [feedback, setFeedback] = useState(null)

  useEffect(() => {
    if (daoAddress) {
      getDAOContract(daoAddress).then((contract: any) => {
        contract
          .getFeedback({ id })
          .then((fb: any) => {
            console.log('###', id, fb)
            setFeedback(fb)
          })
          .catch((err) => {
            console.log(daoAddress, err)
          })
      })
    }
  }, [daoAddress, id])

  return feedback
}

export const useFeedbackLikes = (daoAddress: string, id: number) => {
  const [likes, setLikes] = useState([])

  useEffect(() => {
    if (daoAddress && typeof id === 'number') {
      getDAOContract(daoAddress).then((contract: any) => {
        contract
          .getLikes({ id })
          .then((likes: any) => {
            setLikes(likes)
          })
          .catch((err) => {
            console.log(daoAddress, err)
          })
      })
    }
  }, [daoAddress, id])

  return likes
}

export const useFeedbackLogs = (daoAddress: string, id: number) => {
  const [logs, setLogs] = useState([])

  useEffect(() => {
    if (daoAddress && typeof id === 'number') {
      getDAOContract(daoAddress).then((contract: any) => {
        contract
          .getLogs({ id })
          .then((logs: any) => {
            setLogs(logs)
          })
          .catch((err) => {
            console.log(daoAddress, err)
          })
      })
    }
  }, [daoAddress, id])

  return logs
}
