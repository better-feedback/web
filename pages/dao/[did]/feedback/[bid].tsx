import { Heading, Box, Button, Markdown, Text } from 'grommet'
import router, { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Layout from '../../../../components/Layout'
import { getDAOContract } from '../../../../utils/wallet'
import Portfolio from '../../../../components/Bounty/Portfolio'
import { useFeedback } from '../../../../hooks/query'

const DAOPage = () => {
  const { query } = useRouter()
  const [bounty, setBounty] = useState<any>()
  const daoAddress = query.did as string
  const feedbackId = query.bid as string
  const feedback = useFeedback(daoAddress, Number(feedbackId))
  console.log(feedback)
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
        <Portfolio feedback={feedback} daoAddress={daoAddress} />
        <Box flex="grow" pad="medium" style={{ border: '1px solid #333' }}>
          <Heading margin={{ top: '0px' }}>{bounty?.title}</Heading>
          <Markdown>{bounty?.description ?? ''}</Markdown>
        </Box>
      </Box>
    </Layout>
  )
}

export default DAOPage
