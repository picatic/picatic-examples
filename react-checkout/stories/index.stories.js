import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'

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
      <Button type="fill" style={{ marginRight: 15 }}>
        Click Me
      </Button>
      <Button type="fill" color="primary" style={{ marginRight: 15 }}>
        Click Me
      </Button>
      <Button type="fill" color="secondary" style={{ marginRight: 15 }}>
        Click Me
      </Button>
    </div>
    <Text style={{ marginBottom: 15 }}>Outline</Text>
    <div style={{ marginBottom: 30 }}>
      <Button type="outline" style={{ marginRight: 15 }}>
        Click Me
      </Button>
      <Button type="outline" color="primary" style={{ marginRight: 15 }}>
        Click Me
      </Button>
      <Button type="outline" color="secondary" style={{ marginRight: 15 }}>
        Click Me
      </Button>
    </div>
    <Text style={{ marginBottom: 15 }}>Sizes</Text>
    <div>
      <Button
        type="fill"
        color="primary"
        size="small"
        style={{ marginBottom: 15 }}
      >
        Click Me
      </Button>
      <br />
      <Button
        type="fill"
        color="primary"
        size="medium"
        style={{ marginBottom: 15 }}
      >
        Click Me
      </Button>
      <br />
      <Button
        type="fill"
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
