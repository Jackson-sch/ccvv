export const isAdministrator = (userId) => {
  return userId === process.env.NEXT_PUBLIC_ADMINISTRATOR
}