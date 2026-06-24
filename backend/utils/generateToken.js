import jwt from "jsonwebtoken";

export const generateAccessToken = (userOrId) => {
  const id = userOrId?._id || userOrId;
  return jwt.sign(
    { id },
    process.env.JWT_ACCESS_SECRET,
    {
      expiresIn : "15m"
    }
  )
}

export const generateRefreshToken = (userOrId) => {
  const id = userOrId?._id || userOrId;
  return jwt.sign(
    { id },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn : "1d"
    }
  )
}