import * as React from 'react'
import { Box, Text, Button, Keyboard, TextInput } from 'grommet'
import { X } from 'react-feather'

const Tag = ({ children, onRemove, ...rest }) => {
  const tag = (
    <Box
      direction="row"
      align="center"
      background="brand"
      pad={{ horizontal: 'small', vertical: 'xxsmall' }}
      margin={{ vertical: 'xxsmall' }}
      round="medium"
      {...rest}
    >
      <Text size="medium" margin={{ right: 'small' }}>
        {children}
      </Text>
      {onRemove && <X size={20} color="white" />}
    </Box>
  )

  if (onRemove) {
    return <Button onClick={onRemove}>{tag}</Button>
  }
  return tag
}

const TagsInput = ({ value = [], onAdd, onChange, onRemove, ...rest }) => {
  const [currentTag, setCurrentTag] = React.useState('')
  const boxRef = React.useRef()

  const updateCurrentTag = (event) => {
    setCurrentTag(event.target.value)
    if (onChange) {
      onChange(event)
    }
  }

  const onAddTag = (tag) => {
    if (onAdd) {
      onAdd(tag)
    }
  }

  const onEnter = () => {
    if (currentTag.length) {
      onAddTag(currentTag)
      setCurrentTag('')
    }
  }

  const renderValue = () =>
    value.map((v, index) => (
      <Tag
        margin="xxsmall"
        key={`${v}${index + 0}`}
        onRemove={() => onRemove(v)}
      >
        {v}
      </Tag>
    ))

  return (
    <Keyboard onEnter={onEnter}>
      <Box
        direction="column"
        align="start"
        pad="small"
        margin={{ top: '5px', bottom: '10px' }}
        border="all"
        ref={boxRef}
      >
        {value.length > 0 && renderValue()}
        <Box flex style={{ minWidth: '120px' }}>
          <TextInput
            type="search"
            placeholder="Add your custom catgories"
            plain
            dropTarget={boxRef.current}
            {...rest}
            onChange={updateCurrentTag}
            value={currentTag}
            onSuggestionSelect={(event) => onAddTag(event.suggestion)}
          />
        </Box>
      </Box>
    </Keyboard>
  )
}

export default TagsInput
