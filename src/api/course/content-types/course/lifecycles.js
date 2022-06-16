const slugify = require('slugify');

module.exports = {

  async beforeCreate(event) {
    const {data} = event.params;
    if (data.course_name) {
      data.slug = slugify(data.course_name, { lower: true });
      console.log(data)
    }
  },
  async beforeUpdate(event) {
    const {data} = event.params;
    if (data.course_name) {
     data.slug = slugify(data.course_name, { lower: true });
     console.log("beforeUpdate", data)
    }
  },
};
