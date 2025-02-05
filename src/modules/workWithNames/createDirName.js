export default (url) => {
  const urlWithoutProtocol = url.split('//')[1];
  const result = `${urlWithoutProtocol.replace(/[^\w]/g, '-')}_files`;
  return result;
};
