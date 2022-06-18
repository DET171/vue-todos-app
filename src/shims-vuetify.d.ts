declare module 'vuetify'
declare module 'vuetify/lib/components'
declare module 'vuetify/lib/directives'
declare module '*.svg' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const content: any;
  export default content;
}
