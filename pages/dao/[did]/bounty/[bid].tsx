import { Heading, Box, Button, Markdown, Text } from 'grommet'
import router, { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Layout from '../../../../components/Layout'
import { getDAOContract } from '../../../../utils/wallet'
import Portfolio from '../../../../components/Bounty/Portfolio'

const DAOPage = () => {
  const { query } = useRouter()
  const [bounty, setBounty] = useState<any>()
  const daoId = query.did as string
  const bountyId = query.bid as string
  console.log(daoId, bountyId, bounty)
  useEffect(() => {
    if (daoId && bountyId) {
      getDAOContract(daoId).then((contract: any) => {
        contract.getBounty({ id: bountyId }).then((bounty: any) => {
          setBounty(bounty)
        })
      })
    }
  }, [daoId, bountyId])
  // if (!bounty) {
  //   return <div>Loading...</div>
  // }
  return (
    <Layout title={bounty?.title ?? ''}>
      <Box
        direction="row"
        align="start"
        justify="between"
        gap="medium"
        pad={{ vertical: 'medium' }}
      >
        <Portfolio bounty={bounty} daoId={daoId} bountyId={bountyId} />
        <Box flex="grow" pad="medium" style={{ border: '1px solid #333' }}>
          <Heading margin={{ top: '0px' }}>{bounty?.title}</Heading>
          <Markdown>{bounty?.description ?? ''}</Markdown>
        </Box>
      </Box>
    </Layout>
  )
}

export default DAOPage
