const LoadingSpinner = () => {
  return (
    <div className="text-center py-8">
      <div className="border-b-2 border-primary-600 w-8 h-8 rounded-full animate-spin inline-block"></div>
      <p className="mt-2 text-gray-600">로딩 중...</p>
    </div>
  );
};

export default LoadingSpinner;
