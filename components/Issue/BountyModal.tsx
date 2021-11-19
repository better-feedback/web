import { useState } from 'react'
import { Layer, Box, TextArea, Text, Button, Select, Heading } from 'grommet'
import { ExLvList, ExperienceLevel, Issue, ToastType } from '../../type'
import { addComment, issueToBounty } from '../../utils/contract'
import { toast } from '../../utils/common'

export default function BountyModal({
  issue,
  daoAddress,
  onClose,
  setIsLoading,
}: {
  issue: Issue
  daoAddress: string
  onClose: any
  setIsLoading: any
}) {
  const [exLv, setExLv] = useState(ExLvList[0])

  const onIssueToBounty = () => {
    setIsLoading(true)
    issueToBounty(daoAddress, issue.id, ExLvList.indexOf(exLv))
      .then(() => {
        setIsLoading(false)
        toast(ToastType.SUCCESS, 'Issue to Bounty Successfully')
        onClose()
      })
      .catch((error) => {
        toast(ToastType.ERROR, error.message)
        setIsLoading(false)
      })
  }

  return (
    <Layer>
      <Box pad="medium" gap="medium" width="400px">
        <Heading level={3} margin="none">
          Issue to Bounty
        </Heading>

        <Box gap="small">
          <Text weight="bold">Experience Level</Text>
          <Select
            options={ExLvList}
            value={exLv}
            onChange={({ option }) => setExLv(option)}
          />
        </Box>

        <Box direction="row" justify="around">
          <Button label="Cancel" onClick={onClose} />
          <Button label="Submit" primary onClick={onIssueToBounty} />
        </Box>
      </Box>
    </Layer>
  )
}
