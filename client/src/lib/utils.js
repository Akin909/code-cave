//@flow
export const capitaliseAndSpace = (string: string): string => {
  //If it contains an underscore this is removed and the word is capitalised
  const spacedString = string.replace('_', ' ');
  return spacedString[0].toUpperCase() + spacedString.slice(1);
};
