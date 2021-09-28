import BaseButton from '../components/BaseButton'
import { BeakerIcon } from '@heroicons/vue/solid'

export default {
  title: 'Components/BaseButton',
  argTypes: {
    color: {
      options: ['default', 'accent', 'danger', 'success', 'warning', 'info'],
      control: { type: 'select' }
    },
    variant: {
      options: ['default', 'secondary', 'tertiary', 'link'],
      control: { type: 'select' }
    },
    size: {
      options: ['default', 'sm', 'lg', 'xl'],
      control: { type: 'select' }
    },
    default: { control: { type: 'text' } },
    onClick: {}
  }
}

export const Button = (args) => ({
  components: { BaseButton },
  setup () {
    return { args }
  },
  template: '<base-button v-bind="args">Button</base-button>'
})

export const IconButton = (args) => ({
  components: { BaseButton, BeakerIcon },
  setup () {
    return {
      args: {
        ...args,
        isIcon: true
      }
    }
  },
  template: '<base-button v-bind="args"><beaker-icon></beaker-icon></base-button>'
})
