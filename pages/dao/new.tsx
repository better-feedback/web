import {
  Box,
  Form,
  Heading,
  TextInput,
  FormField,
  Button,
  TextArea,
} from 'grommet'
import { useState } from 'react'
import Layout from '../../components/Layout'

export default function DAONew({}) {
  const [subDAO, setSubDAO] = useState({
    subName: '',
    description: '',
    website: '',
  })
  return (
    <Layout title="New DAO">
      <Box direction="column" align="center" gap="small">
        <Heading level="2">Create new DAO</Heading>
        <Form
          value={subDAO}
          onChange={(nextValue) => setSubDAO(nextValue)}
          onSubmit={({ value }) => {}}
          style={{ width: 400 }}
        >
          <TextInput
            placeholder="DAO name(will be prefix of .better.near)"
            id="subName"
            name="subName"
            style={{ marginBottom: 20 }}
          />
          <TextInput
            placeholder="Project website"
            id="website"
            name="website"
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
            />
          </Box>
        </Form>
      </Box>
    </Layout>
  )
}
