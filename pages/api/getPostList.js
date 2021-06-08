// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

//TODO-3 : 負責把一堆資料 filter 成 note page 想要的資訊是這裡的工作
export default (req, res) => {
  const { tag, page } = req.query
  res.status(200).json({ tag: tag, page: page })
}
