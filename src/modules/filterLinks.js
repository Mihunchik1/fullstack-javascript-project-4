export default (link, url) => {
  const { host } = new URL(url);
  if (link.startsWith('http') && !link.includes(host)) {
    return false;
  }
  return true;
};
