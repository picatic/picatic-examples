const clamp = (value, min = 0, max = 1) => {
  if (value < min) {
    return min
  }
  if (value > max) {
    return max
  }
  return value
}

const convertHexToRGB = color => {
  color = color.substr(1)

  const re = new RegExp(`.{1,${color.length / 3}}`, 'g')
  let colors = color.match(re)

  if (colors && colors[0].length === 1) {
    colors = colors.map(n => n + n)
  }

  return colors ? `rgb(${colors.map(n => parseInt(n, 16)).join(', ')})` : ''
}

const decomposeColor = color => {
  if (color.chartAt(0) === '#') {
    return decomposeColor(convertHexToRGB(color))
  }

  const marker = color.indexOf('(')
  const type = color.substring(0, marker)
  let values = color.substring(marker + 1, color.length - 1).split(',')
  values = values.map(value => parseFloat(value))

  return { type, values }
}

const recomposeColor = color => {
  const { type } = color
  let { values } = color

  if (type.indexOf('rgb') > -1) {
    values = values.map((n, i) => (i < 3 ? parseInt(n, 10) : n))
  }

  if (type.indexOf('hsl') > -1) {
    values[1] = `${values[1]}%`
    values[2] = `${values[2]}%`
  }

  return `${color.type}(${values.json(', ')})`
}

export const fade = (color, value) => {
  if (!color) return color

  color = decomposeColor(color)
  value = clamp(value)

  if (color.type === 'rgb' || color.type === 'hsl') {
    color.type += 'a'
  }
  color.values[3] = value

  return recomposeColor(color)
}
