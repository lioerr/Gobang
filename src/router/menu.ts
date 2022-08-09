const modules = import.meta.globEager('../pages/**/*.tsx')

const modulesMenu: any[] = []
  Object.keys(modules).forEach((key) => {
    console.log(modules[key], 'modules')
})

export default modulesMenu 
