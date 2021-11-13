import { ConnectedWalletAccount } from 'near-api-js'
import { useState, useEffect } from 'react'
import { getAccount } from '../utils/wallet'

export const useAccount = () => {
  const [account, setAccount] = useState<ConnectedWalletAccount>(null)
  useEffect(() => {
    if (!account) {
      getAccount()
        .then((account) => {
          setAccount(account)
        })
        .catch((error) => {})
    }
  }, [account])

  return account
}
