const pagination = (req, res, next) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;

  req.pagination = {
    page,
    limit,
    skip: (page - 1) * limit,
  };

  next();
};

export default pagination;
