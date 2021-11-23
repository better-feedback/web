import { useState } from 'react'
import { Layer, Box, TextArea, Text, Button } from 'grommet'
import { Issue, ToastType } from 'type'
import { addComment } from 'utils/contract'
import { toast } from 'utils/common'

export default function CommentModal({
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
  const [comment, setComment] = useState('')

  const onAddComment = () => {
    if (!comment) {
      return
    }

    setIsLoading(true)
    addComment(daoAddress, issue.id, comment)
      .then(() => {
        setIsLoading(false)
        onClose()
        setTimeout(() => {
          window.location.reload()
        }, 1000)
      })
      .catch((error) => {
        setIsLoading(false)
        toast(ToastType.ERROR, error.message)
      })
  }

  return (
    <Layer>
      <Box pad="medium" gap="medium" width="600px">
        <Text weight="bold">Comment</Text>
        <TextArea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          style={{ height: '200px' }}
        />
        <Box direction="row" justify="around">
          <Button label="Cancel" onClick={onClose} />
          <Button label="Submit" primary onClick={onAddComment} />
        </Box>
      </Box>
    </Layer>
  )
}
