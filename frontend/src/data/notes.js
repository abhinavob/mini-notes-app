export const EMPTY_NOTE_FORM = {
  title: '',
  content: '',
  tags: '',
};

export function parseTags(value) {
  return value
    .split(',')
    .map((tag) => tag.trim().toLowerCase())
    .filter(Boolean)
    .filter((tag, index, list) => list.indexOf(tag) === index);
}
