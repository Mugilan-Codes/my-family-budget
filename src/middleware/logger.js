export const Logger = (req, res, next) => {
  console.log(`Logged ${req.url}    ${req.method} -- ${new Date()}`);
  next();
};
