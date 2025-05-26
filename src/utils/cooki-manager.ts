import Cookies from 'js-cookie';

interface McData {
  username: string;
  uuid: string;
  playedBefore: boolean;
}

const MC_DATA_KEY = 'naizu-mc-data';

export const getMcDataFromCookie = (): McData | null => {
  const mcData = Cookies.get(MC_DATA_KEY);
  if (mcData) {
    try {
      const mcdata = JSON.parse(mcData);
      return mcdata;
    } catch (e) {
      console.error('Error parsing minecraft login data: ', e);
      // Clear invalid cookie
      Cookies.remove(MC_DATA_KEY);
    }
  }
  return null;
};

export const setMcDataToCookie = (mcData: McData) => {
  Cookies.set(MC_DATA_KEY, JSON.stringify(mcData));
};

export const removeMcDataFromCookie = () => {
  Cookies.remove(MC_DATA_KEY);
}
