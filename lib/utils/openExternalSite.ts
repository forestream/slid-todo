const openExternalSite = (url: string, target = '_blank') => {
  const formattedUrl = url.startsWith('http') ? url : `https://${url}`;
  window.open(formattedUrl, target, 'noopener,noreferrer');
};

export default openExternalSite;
