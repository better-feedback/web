import { Box, Text, RadioButtonGroup, CheckBoxGroup, Anchor } from 'grommet'
import { useDAOviewMethod } from '../../hooks/query'
import { StatusList } from '../../type'

export default function IssueFilter({
  daoAddress,
  status,
  setStatus,
  category,
  setCategory,
}: {
  daoAddress: string
  status: string
  setStatus: any
  category: string
  setCategory: any
}) {
  const categories = useDAOviewMethod(
    daoAddress,
    'getCategories',
    undefined,
    []
  )
  return (
    <Box gap="medium">
      <Box gap="small">
        <Box direction="row" justify="between">
          <Text weight="bold">Status</Text>
          <Anchor
            label="Clear"
            size="small"
            onClick={() => {
              setStatus(-1)
            }}
          />
        </Box>
        <RadioButtonGroup
          name="status"
          options={StatusList}
          value={status}
          onChange={(event) => setStatus(event.target.value)}
        />
      </Box>
      <Box gap="small">
        <Box direction="row" justify="between">
          <Text weight="bold">Category</Text>
          <Anchor
            label="Clear"
            size="small"
            onClick={() => {
              setCategory(undefined)
            }}
          />
        </Box>
        <RadioButtonGroup
          name="category"
          options={categories}
          value={category}
          onChange={(event) => {
            setCategory(event.target.value)
          }}
        />
      </Box>
      {/* <Box gap="small">
        <Text weight="bold">Experience Level</Text>
        <CheckBoxGroup options={['Beginner', 'Intermediate', 'Advanced']} />
      </Box> */}
    </Box>
  )
}
