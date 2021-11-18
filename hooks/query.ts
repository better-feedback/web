import { useEffect, useState } from 'react'
import { BetterDAO } from '../type'
import { getDAOContract, getFactoryContract } from '../utils/wallet'

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

export const useDAOviewMethod = (
  daoAddress: string,
  methodName: string,
  params: any,
  defaultValue: any
) => {
  const [value, setValue] = useState(defaultValue)

  useEffect(() => {
    if (daoAddress) {
      getDAOContract(daoAddress).then((contract: any) => {
        contract[methodName](params)
          .then((value: any) => {
            setValue(value)
          })
          .catch((err) => {
            console.log('###useDAOviewMethod', daoAddress, methodName, err)
          })
      })
    }
  }, [daoAddress, methodName, params])

  return value
}
