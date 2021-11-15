import { Box, Form, Heading, TextInput, Button, TextArea } from 'grommet'
import { useState } from 'react'
import Layout from '../../components/Layout'
import { BetterDAO } from '../../type'
import { createDAO } from '../../utils/contract'

export default function DAONew({}) {
  const [dao, setDAO] = useState<BetterDAO>({
    name: 'ygg',
    projectUrl: '',
    logoUrl: '',
    description: 'Exit music',
  })

  const onCreateDAO = async () => {
    await createDAO(dao)
  }
  return (
    <Layout title="New DAO">
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
