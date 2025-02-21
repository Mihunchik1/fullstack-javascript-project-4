export default (link, url) => {
  const { host } = new URL(url);
  let linkHost;
  try {
    linkHost = new URL(link).host;
  } catch (error) {
    linkHost = true;
  }
  if (link.startsWith('http') && !linkHost.startsWith(host)) {
    return false;
  }
  return true;
};
