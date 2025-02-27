// これいらないかも

const createUnixTime = (): number => {
  const date = new Date()
  // console.log(date.getTime())
  return date.getTime()
}

export default createUnixTime