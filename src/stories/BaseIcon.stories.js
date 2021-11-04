import BaseIcon from '@/components/BaseIcon'

export default {
  title: 'Components/BaseIcon',
  argTypes: {
    color: {
      options: ['inherit', 'brand', 'accent', 'danger', 'success', 'warning', 'info'],
      control: { type: 'select' },
      table: { defaultValue: 'brand' }
    },
    type: {
      options: ['solid', 'outline'],
      control: { type: 'select' }
    },
    size: {
      options: ['base', 'xs', 'sm', 'md', 'lg', 'xl', 'xl2', 'xl3', 'xl4', 'xl5', 'xl6', 'h-full'],
      control: { type: 'select' }
    }
  },
  args: {
    color: 'brand',
    type: 'solid',
    size: 'base'
  }
}

export const Icon = (args) => ({
  components: { BaseIcon },
  setup () {
    return { args }
  },
  template: '<base-icon v-bind="args" name="BeakerIcon" ></base-icon>'
})
