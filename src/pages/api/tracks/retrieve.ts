import { NextApiRequest, NextApiResponse } from 'next'
import { fetcher } from '../../../utils/functions'

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(400).json({ message: 'Method not allowed' })
  const response = await fetcher(`wp-json/itl/v1/track/${req.query.id}`)

  return res.status(200).send(await response.json())
}
