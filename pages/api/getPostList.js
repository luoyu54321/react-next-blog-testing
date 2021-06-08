// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {
  const { tag, page } = req.query
  res.status(200).json({ tag: tag, page: page })
}
