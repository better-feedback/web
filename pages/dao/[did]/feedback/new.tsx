import {
  Box,
  Form,
  Heading,
  TextInput,
  Button,
  TextArea,
  Select,
} from 'grommet'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Layout from '../../../../components/Layout'
import { FeedbackTag } from '../../../../type'
import { createFeedback } from '../../../../utils/contract'

export default function BountyNew({}) {
  const router = useRouter()
  const daoName = router.query.did as string
  const [feedback, setFeedback] = useState({
    title: 'This is a test',
    description: `
      [ ] A
      [ ] B
    `,
    tag: FeedbackTag.BUG,
  })

  const onCreateFeedback = () => {
    createFeedback(daoName, {
      title: feedback.title,
      description: feedback.description,
      tags: [feedback.tag],
    })
      .then((tx) => {
        router.back()
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <Layout title="New Feedback">
      <Box direction="column" align="center" gap="small">
        <Heading level="2">Create a feedback</Heading>
        <Form
          value={feedback}
          onChange={(nextValue) => setFeedback(nextValue)}
          onSubmit={({ value }) => {}}
          style={{ width: 500 }}
        >
          <TextInput
            placeholder="Bounty title"
            id="title"
            name="title"
            style={{ marginBottom: 20 }}
          />
          <TextArea
            placeholder="Description"
            id="description"
            name="description"
            style={{ marginBottom: 20, height: 160 }}
          />
          <Select
            id="tag"
            name="tag"
            style={{ width: '100%' }}
            options={[
              FeedbackTag.BUG,
              FeedbackTag.FEATURE_REQUEST,
              FeedbackTag.SUGGESTION,
              FeedbackTag.OTHER,
            ]}
          />

          <Box
            direction="row"
            justify="center"
            gap="medium"
            style={{ marginTop: 20 }}
          >
            <Button
              type="submit"
              size="large"
              primary
              label="Submit"
              color="#333"
              onClick={onCreateFeedback}
            />
          </Box>
        </Form>
      </Box>
    </Layout>
  )
}
