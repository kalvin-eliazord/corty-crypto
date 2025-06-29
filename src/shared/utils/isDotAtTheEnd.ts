export const isDotAtTheEnd = (
  amountInput: string,
  e: React.ChangeEvent<HTMLInputElement>
) => {
  if (
    amountInput[amountInput.length - 1] === "." &&
    e.target.value[e.target.value.length - 1] === "."
  )
    return true;

  return false;
};