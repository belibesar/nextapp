'use client';

export default function GoBackButton() {
  const goBack = () => {
    window.history.back();
  };
  return (
    <button
      onClick={goBack}
      className="btn btn-info text-white hover:text-gray-100 hover:cursor-pointer duration-200 capitalize"
    >
      go back
    </button>
  );
}
