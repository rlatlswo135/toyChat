import { NextApiResponse, NextApiRequest } from "next";

export default async function login(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const token = req.body.token;
  if (token) {
    res.status(200).send("login");
  }
}
