import ProgressBar from "./ProgressBar";

type ProgressData = {
  id: number;
  title: string;
  description?: string;
  percent: number;
};

type ProgressListProps = {
  data: ProgressData[];
};

const ProgressList = ({ data }: ProgressListProps) => {
  return (
    <div className="space-y-2">
      {data.map((progress) => {
        return (
          <div key={progress.id}>
            <div className="mb-2 flex justify-between">
              <div className="text-sm font-medium">{progress.title}</div>

              <div className="text-sm text-gray-500">{progress.percent}%</div>
            </div>
            <ProgressBar percent={progress.percent} />
            {progress.description && (
              <div className="text-sm text-gray-500">
                {progress.description}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ProgressList;
