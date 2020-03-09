const customResults = (model, populate) => async (req, res, next) => {
  let query;
  const requestQuery = { ...req.query };
  const removeFields = ["select", "sort", "page", "limit", "name"];
  removeFields.forEach(field => delete requestQuery[field]);

  let queryString = JSON.stringify(requestQuery);
  queryString = queryString.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    match => `$${match}`
  );

  query = model.find(JSON.parse(queryString));

  if (req.query.name) {
    let RegExpQ = new RegExp(req.query.name, "i");
    query = model.find({
      name: { $regex: RegExpQ }
    });
  }

  if (req.query.select) {
    const fields = req.query.select.split(",").join(" ");
    query = query.select(fields);
  }

  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("-createdAt");
  }

  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25;
  const startIdx = (page - 1) * limit;
  const endIdx = page * limit;
  const total = await model.countDocuments();

  query = query.skip(startIdx).limit(limit);

  if (populate) {
    query = query.populate(populate);
  }

  const results = await query;

  const pagination = {};

  if (endIdx < total) {
    pagination.next = {
      page: page + 1,
      limit
    };
  }

  if (startIdx > 0) {
    pagination.prev = {
      page: page - 1,
      limit
    };
  }

  res.customResults = {
    results: results,
    pagination
  };

  next();
};

module.exports = customResults;
