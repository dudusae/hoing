const save = (LSkey, content) => {
  localStorage.setItem(LSkey, JSON.stringify(content));
};

const load = LSkey => {
  const loaded = localStorage.getItem(LSkey);
  return loaded !== null ? JSON.parse(loaded) : []
};

export { save, load };
