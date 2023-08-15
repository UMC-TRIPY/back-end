const tagRepository = require("./tag.repository");

exports.findOrCreateTag = async (tag_name) => {
  const tag = await tagRepository.getTagByName(tag_name);

  if (!tag) {
    await tagRepository.createTag(tag_name);

    const tag = await tagRepository.getTagByName(tag_name);

    return tag;
  }
  return tag;
};
