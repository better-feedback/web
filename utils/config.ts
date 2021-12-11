export function getContractName() {
  return getNearConfig().contractName
}

export function getNearConfig() {
  return {
    networkId: process.env.NEXT_PUBLIC_NEAR_NETWORK_ID || 'testnet',
    nodeUrl:
      process.env.NEXT_PUBLIC_NEAR_NODE_URL || 'https://rpc.testnet.near.org',
    contractName:
      process.env.NEXT_PUBLIC_NEAR_CONTRACT_NAME || 'better.betterhq.testnet',
    walletUrl:
      process.env.NEXT_PUBLIC_NEAR_WALLET_URL ||
      'https://wallet.testnet.near.org',
    helperUrl:
      process.env.NEXT_PUBLIC_NEAR_HELPER_URL ||
      'https://helper.testnet.near.org',
  }
}

export function getGitHubConfig() {
  return {
    repoOwner: process.env.NEXT_PUBLIC_REPO_OWNER || '',
    repoName: process.env.NEXT_PUBLIC_REPO_NAME || '',
    betterIssueLabel: process.env.NEXT_PUBLIC_REPO_ISSUE_LABEL || 'better',
    pat: process.env.REPO_PAT,
  }
}

export function getConfig() {
  return {
    github: getGitHubConfig(),
    chains: {
      near: getNearConfig(),
    },
  }
}
