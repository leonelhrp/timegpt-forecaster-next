import { TimeGPTImportanceExogenousVarsProps } from "@/types/forecast";

const FeatureWeightsTable = ({ weightsData }: TimeGPTImportanceExogenousVarsProps) => {
  return (
    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg max-h-[15rem] overflow-y-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Id
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Feature
            </th>
            <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Weight
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {weightsData.features.map((feature, index) => (
            <tr key={feature}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{index}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{feature}</div>
              </td>
              <td className="px-6 py-4 text-right whitespace-nowrap">
                <div className="text-sm text-gray-500">{weightsData.weights[index].toLocaleString('en-US', { minimumFractionDigits: 4 })}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FeatureWeightsTable;