import {isObject} from '.'

const overrideObject = <T extends object, U extends object>(target: T, source: U): U | null => {
  if (isObject(target) && isObject(source)) return null
  const destination = {}
  Object.keys(source).forEach((key) => {
    if(target[key]) {
      if(isObject(target[key])) {
        
      }
    }
  })
}