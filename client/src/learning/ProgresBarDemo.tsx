const ProgresBarDemo = () => {
  const item = {
    title: "Školení BOZP",
    percent: 78,
  };
  return (
    <div className="w-full h-4 bg-gray-200 rounded-full">
      <div
        className="h-4 bg-green-500 rounded-full"
        style={{ width: `${item.percent}%` }}
      ></div>
    </div>
  );
};

export default ProgresBarDemo;
