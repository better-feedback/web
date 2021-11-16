import { Box, Form, Heading, TextInput, Button, TextArea } from 'grommet'
import { useState } from 'react'
import Layout from '../../components/Layout'
import { BetterDAO } from '../../type'
import { createDAO } from '../../utils/contract'

export default function DAONew({}) {
  const [dao, setDAO] = useState<BetterDAO>({
    name: `test_`,
    projectUrl: '',
    logoUrl: '',
    description: 'Exit music',
  })
  const [isLoading, setIsLoading] = useState(false)

  const onCreateDAO = () => {
    if (!/^[a-z1-9_-]{1,13}$/.test(dao.name)) {
      alert('Invalid name')
      return
    }

    if (
      dao.projectUrl &&
      /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/.test(
        dao.projectUrl
      )
    ) {
      alert('Invalid project url')
      return
    }

    if (
      dao.logoUrl &&
      /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/.test(dao.logoUrl)
    ) {
      alert('Invalid logo url')
      return
    }

    if (dao.description.length > 200) {
      alert('Description too long, no more than 200 characters')
      return
    }

    setIsLoading(true)
    createDAO(dao)
      .then(() => {
        setIsLoading(false)
      })
      .catch((error) => {
        alert(error.message)
        setIsLoading(false)
      })
  }
  return (
    <Layout title="New DAO" isLoading={isLoading}>
      <Box direction="column" align="center" gap="small">
        <Heading level="2">Create new DAO</Heading>
        <Form
          value={dao}
          onChange={(nextValue) => setDAO(nextValue)}
          style={{ width: 400 }}
        >
          <TextInput
            placeholder="DAO name(will be prefix of .better.near)"
            id="name"
            name="name"
            style={{ marginBottom: 20 }}
          />
          <TextInput
            placeholder="Project URL"
            id="projectUrl"
            name="projectUrl"
            type="url"
            style={{ marginBottom: 20 }}
          />
          <TextInput
            placeholder="DAO logo url"
            id="logoUrl"
            name="logoUrl"
            type="url"
            style={{ marginBottom: 20 }}
          />
          <TextArea
            placeholder="Description"
            id="description"
            name="description"
            maxLength={200}
            style={{ marginBottom: 20, height: 160 }}
          />

          <Box direction="row" justify="center" gap="medium">
            <Button
              type="submit"
              size="large"
              primary
              label="Submit"
              color="#333"
              onClick={onCreateDAO}
            />
          </Box>
        </Form>
      </Box>
    </Layout>
  )
}
