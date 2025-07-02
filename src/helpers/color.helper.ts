import { COLOR_TEMPLATE } from "@/constants/colorTemplate";

export const getRandomColorTemplate = () => {
  const randomIndex = Math.floor(Math.random() * COLOR_TEMPLATE.length);
  return COLOR_TEMPLATE[randomIndex];
};
