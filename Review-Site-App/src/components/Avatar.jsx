import { IoPerson } from 'react-icons/io5';
import chroma from 'chroma-js';

const Avatar = ({ userId, size, userMenu }) => {
  // Define the array of colors - 100 distinct colors from chroma
  // const colors = chroma.scale("set3").colors(100);

  // hash function to assign id character code value to color
  const getColorForUser = (userId) => {
    // generate hash from userId string to map to a consistent color
    // << 5: left shift of 5 multiplies value by 2^5 (32)
    const hash = [...userId].reduce((hash, char) => {
      return char.charCodeAt(0) + ((hash << 5) - hash);
    }, 0); // Initial hash value of 0

    // Map the hash to a hue value (0 to 360) to generate a distinct color
    const hue = Math.abs(hash) % 360; // Use modulus to keep hue within range of 0-360

    // Generate the color with chroma using the hue and a fixed saturation/lightness
    return chroma.hsl(hue, 0.7, 0.6).hex();
    // // return color value from converting hash to index within colors array
    // return colors[Math.abs(hash) % colors.length];
  };

  // Pick a random color from the array
  // const bgColor = colors[Math.floor(Math.random() * colors.length)];

  return userMenu ? (
    // for user menu on smaller screen
    <div className='w-7'>
      {' '}
      <img
        className='w-full rounded-full'
        src='/placeholder.png'
        alt='Avatar'
      />
    </div>
  ) : (
    // for review listings
    <div
      style={{ backgroundColor: getColorForUser(userId) }}
      className='rounded-full border border-neutral-600 p-2 text-neutral-600 shadow-md'
    >
      <IoPerson size={size} />
    </div>
  );
};

export default Avatar;
