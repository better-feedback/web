import { useState } from 'react'
import { Layer, Box, TextInput, Text, Button } from 'grommet'
import { Issue, ToastType } from '../../type'
import { fundIssue } from '../../utils/contract'
import { toast } from '../../utils/common'
import { utils } from 'near-api-js'

export default function FundModal({
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
  const [amount, setAmount] = useState('1')

  const onFundIssue = () => {
    setIsLoading(true)
    const _amount = utils.format.parseNearAmount(amount)
    fundIssue(daoAddress, issue.id, _amount)
      .then(() => {
        setIsLoading(false)
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
        <Box gap="small">
          <Text weight="bold">Fund amount</Text>
          <TextInput
            value={amount}
            type="number"
            onChange={(e) => setAmount(e.target.value)}
          />
        </Box>
        <Box direction="row" justify="around">
          <Button label="Cancel" onClick={onClose} />
          <Button label="Submit" primary onClick={onFundIssue} />
        </Box>
      </Box>
    </Layer>
  )
}
