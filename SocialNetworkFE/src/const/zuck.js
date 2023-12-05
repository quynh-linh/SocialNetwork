export const timestamp = function () {
    let timeIndex = 1678166046264 / 1000;
    let random = Math.floor(Math.random() * 1000);
  
    return Math.round(timeIndex - random);
};
