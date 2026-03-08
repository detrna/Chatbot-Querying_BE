export default async function response(
  res,
  success,
  statusCode,
  data,
  message,
) {
  const getMeta = () => {
    const date = new Date().toISOString();
    return date;
  };

  const responseSchema = {
    success: success,
    message: message,
    payload: data,
    metadata: {
      timestamp: getMeta(),
    },
  };

  res.status(statusCode).json(responseSchema);
}
