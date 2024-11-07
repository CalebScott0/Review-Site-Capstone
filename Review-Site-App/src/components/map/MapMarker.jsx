const MapMarker = ({ index }) => {
  return (
    <div className="bg-amber-500 text-white w-8 h-8 rounded-full flex justify-center items-center font-bold">
      {index + 1}
    </div>
  );
};

export default MapMarker;
