import BaseIcon from '@/components/BaseIcon'

export default {
  title: 'Components/BaseIcon',
  argTypes: {
    color: {
      options: ['default', 'accent', 'danger', 'success', 'warning', 'info'],
      control: { type: 'select' }
    },
    type: {
      options: ['solid', 'outline'],
      control: { type: 'select' }
    },
    size: {
      options: ['default', 'xs', 'sm', 'md', 'lg', 'xl', 'xl2', 'xl3', 'xl4', 'xl5', 'xl6'],
      control: { type: 'select' }
    }
  }
}

export const Icon = (args) => ({
  components: { BaseIcon },
  setup () {
    return { args }
  },
  template: '<base-icon v-bind="args"></base-icon>'
})
