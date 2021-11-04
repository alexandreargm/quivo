import BaseButton from '../components/BaseButton'
import BaseIcon from '@/components/BaseIcon'

export default {
  title: 'Components/BaseButton',
  component: { BaseButton, BaseIcon },
  argTypes: {
    color: {
      options: ['brand', 'accent', 'danger', 'success', 'warning', 'info', 'white', 'black'],
      control: { type: 'select' }
    },
    variant: {
      options: ['primary', 'secondary', 'tertiary', 'link'],
      control: { type: 'select' }
    },
    size: {
      options: ['base', 'sm', 'lg', 'xl'],
      control: { type: 'select' }
    },
    isIcon: {
      control: { type: 'boolean' }
    },
    onClick: {}
  },
  args: {
    color: 'brand',
    variant: 'primary',
    size: 'base',
    isIcon: false
  }
}

export const Button = (args) => ({
  components: { BaseButton },
  setup () {
    return { args }
  },
  template: '<base-button v-bind="args">Button</base-button>'
})

export const ButtonWithIcon = (args) => ({
  components: { BaseButton, BaseIcon },
  setup () {
    return { args }
  },
  template: `<base-button v-bind="args">
                <template #left>
                  <base-icon color="gray" name="BeakerIcon" />
                </template>

                Button
              </base-button>`
})

export const ButtonWithIconRight = (args) => ({
  components: { BaseButton, BaseIcon },
  setup () {
    return {
      args
    }
  },
  template: `<base-button v-bind="args">
                Button

                <template #right>
                  <base-icon color="inherit" name="BeakerIcon" />
                </template>
              </base-button>`
})

export const IconButton = (args) => ({
  components: { BaseButton, BaseIcon },
  setup () {
    return {
      args: {
        ...args,
        isIcon: true
      }
    }
  },
  template: '<base-button v-bind="args"><base-icon color="gray" name="BeakerIcon" /></base-button>'
})
