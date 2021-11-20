import { ConnectedWalletAccount } from 'near-api-js'
import { useState, useEffect } from 'react'
import { ToastType } from 'type'
import { toast } from 'utils/common'
import { getAccount } from 'utils/wallet'

export const useAccount = () => {
  const [account, setAccount] = useState<ConnectedWalletAccount>(null)
  useEffect(() => {
    if (!account) {
      getAccount()
        .then((account) => {
          setAccount(account)
        })
        .catch((error) => {
          toast(ToastType.ERROR, error.message)
        })
    }
  }, [account])

  return account
}
