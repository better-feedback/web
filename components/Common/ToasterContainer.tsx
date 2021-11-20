import { useEffect, useState } from 'react'
import { Layer, Box, Button, Text } from 'grommet'
import { AlertTriangle, CheckCircle, X } from 'react-feather'
import PubSub from 'pubsub-js'
import { Toaster, ToastType } from 'type'

export default function ToasterContainer() {
  const [noti, setNoti] = useState<Toaster>(null)
  useEffect(() => {
    PubSub.subscribe('toast', (msg, data: Toaster) => {
      setNoti(data)
      setTimeout(() => {
        setNoti(null)
      }, 3000)
    })
  }, [])
  if (!noti) {
    return null
  }
  const onClose = () => setNoti(null)
  return (
    <Layer
      position="bottom"
      modal={false}
      margin={{ vertical: 'medium', horizontal: 'small' }}
      onEsc={onClose}
      responsive={false}
      plain
    >
      <Box
        align="center"
        direction="row"
        gap="small"
        justify="between"
        round="medium"
        elevation="medium"
        pad={{ vertical: 'xsmall', horizontal: 'small' }}
        background={
          noti.type === ToastType.SUCCESS ? 'status-ok' : 'status-error'
        }
      >
        <Box align="center" direction="row" gap="small" pad="xsmall">
          {noti.type === ToastType.SUCCESS ? (
            <CheckCircle />
          ) : (
            <AlertTriangle />
          )}
          <Text>{noti.message}</Text>
        </Box>
        <Button icon={<X />} onClick={onClose} plain />
      </Box>
    </Layer>
  )
}
