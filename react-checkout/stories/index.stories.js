import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'

import Button from '../src/jellyfish/Button'
import Text from '../src/jellyfish/Text'

storiesOf('Buttons', module).add('button', () => (
  <div>
    <Text>Fill</Text>
    <div>
      <Button type="fill">Click Me</Button>
      <Button type="fill" color="primary">
        Click Me
      </Button>
      <Button type="fill" color="secondary">
        Click Me
      </Button>
    </div>
  </div>
))

storiesOf('Typography', module).add('types', () => (
  <div>
    <Text type="display5">Hello World</Text>
    <Text type="display4">Hello World</Text>
    <Text type="display3">Hello World</Text>
    <Text type="display2">Hello World</Text>
    <Text type="display1">Hello World</Text>
    <Text type="headline">Hello World</Text>
    <Text type="title">Hello World</Text>
    <Text type="subheading">Hello World</Text>
    <Text type="body2">Hello World</Text>
    <Text type="body1">Hello World</Text>
    <Text type="caption">Hello World</Text>
  </div>
))
