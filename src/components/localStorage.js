const save = (LSkey, content) => {
  localStorage.setItem(LSkey, JSON.stringify(content));
};

const load = LSkey => {
  const loaded = localStorage.getItem(LSkey);

  if (loaded !== null) {
    return JSON.parse(loaded);
  } else {
    return [];
  }
};

export { save, load };
