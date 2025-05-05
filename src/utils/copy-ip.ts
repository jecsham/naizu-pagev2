const ip = 'play.naizu.net';

export const copyIp = async (): Promise<boolean> => {

  try {
    await navigator.clipboard.writeText(ip);
    console.log('IP copied to clipboard:', ip);
    return true;
  } catch (err) {
    console.error('Failed to copy: ', err);
    return false;
  }
};
