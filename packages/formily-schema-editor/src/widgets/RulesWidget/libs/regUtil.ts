const getRule = (str: string) => {
  if (/^{{(.*)}}$/.test(str)) {
    return (/^{{(.*)}}$/.exec(str)[1] || '').trim()
  }
}

const addExpression = str => {
  return `{{${str}}}`
}

export function test(str) {
  return toReg(getRule(str)) instanceof RegExp
}

export function toReg(str) {
  if (typeof str !== 'string') return ''

  const match = str.match(/^\/(.+)\/([a-z]*)$/i)

  if (!match) {
    return str
  }

  try {
    return new RegExp(match[1], match[2])
  } catch (err) {
    return str
  }
}

export function toStr(reg) {
  return String(reg)
}

export function transform(regStr) {
  regStr = getRule(regStr)
  const match = regStr.match(/^\/(.*)\/([a-z]*)$/i)
  if (!match) {
    return ['', []]
  }
  return [match[1], [...match[2]]]
}

export function restore(content, flags) {
  return addExpression(`/${content}/${flags.join('')}`)
}
