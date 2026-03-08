export default async function response(res, success, statusCode, data) {
  const getMeta = () => {
    return Date.now();
  };

  const payload = {
    success: success,
    data: data,
    metadata: {
      timestamp: getMeta(),
    },
  };

  res.status(statusCode).json(payload);
}
