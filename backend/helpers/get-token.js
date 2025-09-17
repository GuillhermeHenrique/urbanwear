const getToken = (req) => {
  return req.cookies?.token || null;
};

export default getToken;
