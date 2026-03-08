export default async function response(
  res,
  success,
  statusCode,
  data,
  message,
) {
  const getMeta = () => {
    return Date.now();
  };

  const payload = {
    success: success,
    message: message,
    data: data,
    metadata: {
      timestamp: getMeta(),
    },
  };

  res.status(statusCode).json(payload);
}
