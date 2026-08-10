type ProgressBarProps = {
  percent: number;
};

const ProgressBar = ({ percent }: ProgressBarProps) => {
  return (
    <div className="w-full h-4 bg-gray-200 rounded-full">
      <div
        className="h-4 bg-green-500 rounded-full"
        style={{ width: `${percent}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
