export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="mx-auto max-w-md rounded-lg border border-red-100 bg-red-50 p-6 text-center">
      <p className="text-sm font-medium text-red-700">{message || "Something went wrong. Please try again."}</p>
      {onRetry && (
        <button onClick={onRetry} className="btn-primary mt-4">
          Try Again
        </button>
      )}
    </div>
  );
}
