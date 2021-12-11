import { connect, keyStores, WalletConnection, Contract } from 'near-api-js'
import { getNearConfig, getContractName } from './config'

const nearConfig = getNearConfig()
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
    getContractName(), // contract requesting access
    'Better' // optional
    // "http://YOUR-URL.com/success", // optional
    // "http://YOUR-URL.com/failure" // optional
  )
  return wallet.account()
}

export const getFactoryContract = async () => {
  const { wallet } = await getNearWallet()
  const account = wallet.account()
  const contract = new Contract(account, getContractName(), {
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
      'getIssueInfo',
      'getLikes',
      'getLogs',
      'getDAOInfo',
      'getCouncil',
      'getCategories',
      'getIssuesByStatus',
      'getIssuesByCategory',
      'getIssuesCountByStatus',
      'getIssuesCountByCategory',
    ],
    changeMethods: [
      'createIssue',
      'likeIssue',
      'approveIssue',
      'closeIssue',
      'startIssue',
      'completeIssue',
      'updateIssue',
      'addComment',
      'issueToBounty',
      'updateDAO',
      'fundIssue',
      'applyIssue',
      'approveApplicant',
      'claimBounty',
      'revokeApplicant',
      'addCouncilMember',
      'removeCouncilMember',
    ],
  })

  return contract
}

// export const getDAOState = async (daoName: string) => {
//   const state = await new Account(getConnection(), daoName).state()
//   return state
// }
