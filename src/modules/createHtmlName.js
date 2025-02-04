export default (url) => {
  const urlWithoutProtocol = url.split('//')[1];
  const result = `${urlWithoutProtocol.replace(/[^\w]/g, '-')}.html`;
  return result;
};
