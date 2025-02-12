export default (url) => {
  if (!url || typeof url !== 'string') {
    throw new Error('Invalid URL');
  }
  let urlWithoutProtocol = url.split('//')[1];
  const fileName = url.split('/').pop();
  urlWithoutProtocol = urlWithoutProtocol.replace(fileName, '');
  const result = `${urlWithoutProtocol.replace(/[^\w]/g, '-')}${fileName}`;
  return result;
};
