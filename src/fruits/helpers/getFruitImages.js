
const images = import.meta.glob('../../assets/images/fruits/*.webp', {
  eager: true,
  import: 'default',
});

export const getFruitImage = (fruitName) => {
  const key = Object.keys(images).find(path =>
    path.toLowerCase().includes(fruitName.toLowerCase())
  );

  return key ? images[key] : images['../../assets/images/fruits/not-available.webp'];
};
