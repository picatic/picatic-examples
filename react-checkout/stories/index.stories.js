import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'

import { primary } from '../src/jellyfish/colors'
import TextTags from '../src/jellyfish/Text/styles/TextTags'

import Badge from '../src/jellyfish/Badge'
import Button from '../src/jellyfish/Button'
import Text from '../src/jellyfish/Text'

const buttonSizes = ['small', 'medium', 'large']
const buttonColors = ['primary', 'secondary']
const buttonAppearances = ['fill', 'raised']

storiesOf('Buttons', module).add('button', () => (
  <div>
    <div style={{ display: 'flex' }}>
      {buttonAppearances.map(appearance =>
        buttonColors.map(color => (
          <div key={`${color}${appearance}`} style={{ width: 302, margin: 15 }}>
            {buttonSizes.map(size => (
              <Button
                key={`${color}${appearance}${size}`}
                appearance={appearance}
                color={color}
                size={size}
                style={{ marginBottom: 15 }}
                fullWidth
              >
                Text
              </Button>
            ))}
          </div>
        )),
      )}
    </div>
    <Button color="dodger">Apply</Button>
  </div>
))

storiesOf('Typography', module).add('types', () => (
  <div>
    {Object.entries(TextTags).map(([key]) => {
      if (key.indexOf('button') > -1) return false
      return (
        <div key={key} style={{ display: 'flex', marginBottom: 20 }}>
          <Text
            variant="subheading"
            style={{ minWidth: 150, alignSelf: 'center' }}
          >
            {key}
          </Text>
          <Text variant={key}>Types</Text>
        </div>
      )
    })}
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
