'use client'

export default function GoBackButton() {
    const goBack = () => {
        window.history.back();
    }
  return (
    <a onClick={goBack} className='hover:text-gray-500 hover:cursor-pointer'>go back</a>
  );
}