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
    <Text style={{ marginBottom: 15 }}>Raised</Text>
    <div style={{ marginBottom: 30 }}>
      <Button style={{ marginRight: 15 }}>Click Me</Button>
      <Button color="primary" style={{ marginRight: 15 }}>
        Click Me
      </Button>
      <Button color="secondary" style={{ marginRight: 15 }}>
        Click Me
      </Button>
    </div>
    <Text style={{ marginBottom: 15 }}>Fill</Text>
    <div style={{ marginBottom: 30 }}>
      <Button appearance="fill" style={{ marginRight: 15 }}>
        Click Me
      </Button>
      <Button appearance="fill" color="primary" style={{ marginRight: 15 }}>
        Click Me
      </Button>
      <Button appearance="fill" color="secondary" style={{ marginRight: 15 }}>
        Click Me
      </Button>
    </div>
    <Text style={{ marginBottom: 15 }}>Sizes</Text>
    <div>
      <Button
        appearance="fill"
        color="primary"
        size="small"
        style={{ marginBottom: 15 }}
      >
        Click Me
      </Button>
      <br />
      <Button
        appearance="fill"
        color="primary"
        size="medium"
        style={{ marginBottom: 15 }}
      >
        Click Me
      </Button>
      <br />
      <Button
        appearance="fill"
        color="primary"
        size="large"
        style={{ marginBottom: 15 }}
      >
        Click Me
      </Button>
    </div>
  </div>
))

storiesOf('Typography', module).add('types', () => (
  <div>
    {Object.entries(TextTags).map(([key]) => (
      <div key={key} style={{ display: 'flex', marginBottom: 20 }}>
        <Text type="subheading" style={{ minWidth: 150, alignSelf: 'center' }}>
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
