import { connect, keyStores, WalletConnection, Contract } from 'near-api-js'
import { getConfig, CONTRACT_NAME } from './config'

const getNearWallet = async () => {
  const nearConfig = getConfig('testnet')
  const near = await connect({
    ...nearConfig,
    keyStore: new keyStores.BrowserLocalStorageKeyStore(),
  })

  const wallet = new WalletConnection(near, '')
  return { wallet, near }
}

export const getAccount = async () => {
  const { wallet } = await getNearWallet()
  const account = wallet.account()

  return account
}

export const connectWallet = async () => {
  const { wallet } = await getNearWallet()
  wallet.requestSignIn(
    CONTRACT_NAME, // contract requesting access
    'Better' // optional
    // "http://YOUR-URL.com/success", // optional
    // "http://YOUR-URL.com/failure" // optional
  )
  return wallet.account()
}

export const getContract = async () => {
  const { wallet } = await getNearWallet()
  const account = wallet.account()
  const contract = new Contract(account, CONTRACT_NAME, {
    viewMethods: ['getIssueLikes'],
    changeMethods: ['likeIssue'],
  })

  return contract
}
