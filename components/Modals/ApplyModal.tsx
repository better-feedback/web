import { useState } from 'react'
import { Layer, Box, TextArea, Text, Button, Heading } from 'grommet'
import { Issue, ToastType } from 'type'
import { applyIssue } from 'utils/contract'
import { validateApplyForm, toast } from 'utils/common'

export default function ApplyModal({
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
  const [message, setMessage] = useState('')

  const onIssueToBounty = () => {
    if (!validateApplyForm(message)) {
      return
    }
    setIsLoading(true)
    applyIssue(daoAddress, issue.id, message.trim())
      .then(() => {
        setIsLoading(false)
        toast(ToastType.SUCCESS, 'Applied successfully')
        onClose()
        setTimeout(() => {
          window.location.reload()
        }, 1000)
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
          Apply
        </Heading>

        <Box gap="small">
          <Text weight="bold">Intro yourself</Text>
          <TextArea
            placeholder="Intro yourself, paste your github link or describe your experience to prove you are capable to finish it"
            value={message}
            style={{ height: '200px' }}
            onChange={(e) => setMessage(e.target.value)}
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
