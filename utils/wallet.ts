import {
  connect,
  keyStores,
  WalletConnection,
  Contract,
  providers,
  Account,
  Connection,
} from 'near-api-js'
import { getConfig, CONTRACT_NAME } from './config'

const nearConfig = getConfig('testnet')
// const provider = new providers.JsonRpcProvider(nearConfig.nodeUrl)

const getNearWallet = async () => {
  const near = await connect({
    ...nearConfig,
    keyStore: new keyStores.BrowserLocalStorageKeyStore(),
  })

  const wallet = new WalletConnection(near, '')
  return { wallet, near }
}

// const getConnection = () => {
//   const connection = new Connection(nearConfig.nodeUrl, provider, {})
//   return connection
// }

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

export const getFactoryContract = async () => {
  const { wallet } = await getNearWallet()
  const account = wallet.account()
  const contract = new Contract(account, CONTRACT_NAME, {
    viewMethods: ['getDaoList'],
    changeMethods: ['create', 'deleteDAO'],
  })

  return contract
}

export const getDAOContract = async (daoName: string) => {
  const { wallet } = await getNearWallet()
  const account = wallet.account()
  const contract = new Contract(account, daoName, {
    viewMethods: [
      'getDAO',
      'getIssues',
      'getIssue',
      'getLikes',
      'getLogs',
      'getDAOInfo',
      'getCouncil',
      'getCategories',
    ],
    changeMethods: [
      'createIssue',
      'likeIssue',
      'acceptIssue',
      'rejectIssue',
      'startIssue',
      'completeIssue',
    ],
  })

  return contract
}

// export const getDAOState = async (daoName: string) => {
//   const state = await new Account(getConnection(), daoName).state()
//   return state
// }
