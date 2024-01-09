export const abbreviate = (pubkey: string, length = 7) => {
  let str: string;
  str = pubkey;

  return str.slice(0, length) + "..." + str.slice(-length);
};
