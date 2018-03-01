import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'

import { primary } from '../src/jellyfish/colors'
import TextTags from '../src/jellyfish/Text/styles/TextTags'

import Badge from '../src/jellyfish/Badge'
import Button from '../src/jellyfish/Button'
import Text from '../src/jellyfish/Text'

storiesOf('Buttons', module).add('button', () => (
  <div>
    <div style={{ display: 'flex', marginBottom: 30 }}>
      <div style={{ width: 302, margin: 15 }}>
        <Button
          appearance="fill"
          color="secondary"
          size="large"
          style={{ marginBottom: 15 }}
          fullWidth
        >
          Text
        </Button>
        <Button
          appearance="fill"
          color="secondary"
          style={{ marginBottom: 15 }}
          fullWidth
        >
          Text
        </Button>
      </div>
      <div style={{ width: 302, margin: 15 }}>
        <Button
          appearance="fill"
          color="primary"
          size="large"
          style={{ marginBottom: 15 }}
          fullWidth
        >
          Text
        </Button>
        <Button
          appearance="fill"
          color="primary"
          style={{ marginBottom: 15 }}
          fullWidth
        >
          Text
        </Button>
      </div>
      <div style={{ width: 302, margin: 15 }}>
        <Button
          color="secondary"
          size="large"
          style={{ marginBottom: 15 }}
          fullWidth
        >
          Text
        </Button>
        <Button color="secondary" style={{ marginBottom: 15 }} fullWidth>
          Text
        </Button>
      </div>
      <div style={{ width: 302, margin: 15 }}>
        <Button
          color="dodger"
          size="large"
          style={{ marginBottom: 15 }}
          fullWidth
        >
          Text
        </Button>
        <Button color="dodger" style={{ marginBottom: 15 }} fullWidth>
          Text
        </Button>
      </div>
    </div>
  </div>
))

storiesOf('Typography', module).add('types', () => (
  <div>
    {Object.entries(TextTags).map(([key]) => (
      <div key={key} style={{ display: 'flex', marginBottom: 20 }}>
        <Text
          variant="subheading"
          style={{ minWidth: 150, alignSelf: 'center' }}
        >
          {key}
        </Text>
        <Text type={key}>Types</Text>
      </div>
    ))}
  </div>
))

storiesOf('Badge', module).add('badges', () => (
  <div>
    {Object.entries(primary).map(([key]) => {
      return (
        <Badge key={key} color={key} style={{ margin: 5 }}>
          {Label}
        </Badge>
      )
    })}
  </div>
))
