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
import { FeedbackTag, ToastType } from '../../../../type'
import { createFeedback } from '../../../../utils/contract'
import _ from 'lodash'
import { toast } from '../../../../utils/common'
import { useDAOviewMethod } from '../../../../hooks/query'

export default function BountyNew({}) {
  const router = useRouter()
  const daoName = router.query.did as string
  const [isLoading, setIsLoading] = useState(false)
  const [feedback, setFeedback] = useState({
    title: '',
    description: ``,
    tag: FeedbackTag.BUG,
  })

  const categories = useDAOviewMethod(daoName, 'getCategories', undefined, [])

  const onCreateFeedback = () => {
    if (feedback.title.length > 100) {
      toast(ToastType.ERROR, 'Title is too long')
      return
    }
    if (feedback.description.length > 1000) {
      toast(ToastType.ERROR, 'Description is too long')
      return
    }
    setIsLoading(true)
    createFeedback(daoName, {
      title: feedback.title,
      description: feedback.description,
      tags: [feedback.tag],
    })
      .then((tx) => {
        router.back()
        setIsLoading(false)
      })
      .catch((error) => {
        setIsLoading(false)
        toast(ToastType.ERROR, error.message)
      })
  }
  return (
    <Layout title="Create an issue" isLoading={isLoading}>
      <Box direction="column" align="center" gap="small">
        <Heading level="2">Create an issue</Heading>
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
            maxLength={100}
          />
          <TextArea
            placeholder="Description"
            id="description"
            name="description"
            style={{ marginBottom: 20, height: 160 }}
            maxLength={2000}
          />
          <Select
            id="tag"
            name="tag"
            style={{ width: '100%' }}
            options={
              categories || [
                FeedbackTag.BUG,
                FeedbackTag.FEATURE_REQUEST,
                FeedbackTag.SMART_CONTRACT,
                FeedbackTag.UI,
                FeedbackTag.OTHER,
              ]
            }
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
