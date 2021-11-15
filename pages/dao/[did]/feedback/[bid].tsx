import { Heading, Box, Button, Markdown, Text, Anchor } from 'grommet'
import { useRouter } from 'next/router'
import Layout from '../../../../components/Layout'
import Portfolio from '../../../../components/Feedback/Portfolio'
import { useFeedback, useFeedbackLogs } from '../../../../hooks/query'
import { getDAOName, getTagColor } from '../../../../utils/common'
import Logs from '../../../../components/Logs'

const DAOPage = () => {
  const { query } = useRouter()
  const daoAddress = query.did as string
  const feedbackId = query.bid as string
  const feedback = useFeedback(daoAddress, Number(feedbackId))
  const logs = useFeedbackLogs(daoAddress, Number(feedbackId))

  return (
    <Layout title={feedback?.title ?? ''}>
      <Box pad="small" />
      <Anchor label={getDAOName(daoAddress)} href={`/dao/${daoAddress}`} />
      <Box
        direction="row"
        align="start"
        justify="between"
        gap="medium"
        pad={{ vertical: 'medium' }}
      >
        <Portfolio feedback={feedback} daoAddress={daoAddress} />

        <Box width="680px">
          <Box flex="grow" background="white" pad="medium" gap="small">
            <Heading level={3} margin="none">
              {feedback?.title}
            </Heading>

            <Markdown>{feedback?.description ?? ''}</Markdown>
            <Box direction="row">
              {(feedback?.tags ?? []).map((tag) => (
                <Box
                  key={tag}
                  background={getTagColor(tag)}
                  pad={{ vertical: '4px', horizontal: '10px' }}
                >
                  <Text>{tag}</Text>
                </Box>
              ))}
            </Box>
          </Box>

          <Logs logs={logs} />
        </Box>
      </Box>
    </Layout>
  )
}

export default DAOPage
