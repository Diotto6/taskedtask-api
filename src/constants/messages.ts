export const defaultErrorMessage = "An Error Occurred, Please Try Again Later";

export const createMessage = (action: string) => {
  return { message: `${action} com sucesso!` };
};

export const fieldSize = (field: string, length: number) =>
  `${field} must be longer than ${length} characters.`;

export function field(field: string) {
  return { message: `${field} intorretos!` };
}
