export function dividePrice(price) {
  if (price.length <= 3) {
    return price;
  }

  const newPrice = [];
  const priceArr = price.split("");
  const tmp = [];

  while (priceArr.length > 0) {
    tmp.push(priceArr.pop());

    if (tmp.length === 3) {
      newPrice.push(...tmp, " ");
      tmp.length = 0;
    }
  }
  newPrice.push(...tmp);

  return newPrice.reverse().join("");
}
