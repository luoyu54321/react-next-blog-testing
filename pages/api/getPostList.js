// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

//TODO-3 : 負責把一堆資料 filter 成 note page 想要的資訊是這裡的工作
export default (req, res) => {
  const { tag, page } = req.query
  const h1Content = getFirstElementContent(htmlResult, "h1")
  const h6Content = getFirstElementContent(htmlResult, "h6")
  res.status(200).json({ tag: tag, page: page })
}

const getFirstElementContent = (string, ele) => {
  const eleStartIndex = string.indexOf(`<${ele}`);
  if (eleStartIndex > -1) {
    const startElementTagLength = `<${ele}`.length;
    const eleEndIndex = string.indexOf(`/${ele}>`);
    const elementString = string.slice(eleStartIndex + startElementTagLength, eleEndIndex);
    const contentStartIndex = elementString.indexOf(">") + 1;
    const contentEndtIndex = elementString.indexOf("<");
    const elementContent = elementString.slice(contentStartIndex, contentEndtIndex);
    return elementContent
  } else {
    return ""
  }
}
