const slugify = (text) => {
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/[^\w\-]+/g, '') // Remove all non-word chars
      .replace(/\-\-+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, ''); // Trim - from end of text
  };
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const paginate = (query, { page, pageSize }) => {
    const offset = (page - 1) * pageSize;
    const limit = pageSize;
  
    return {
      ...query,
      offset,
      limit,
    };
  };
  
  module.exports = {
    slugify,
    formatDate,
    paginate,
  };