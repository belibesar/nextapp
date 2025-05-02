'use client'

export default function GoBackButton() {
    const goBack = () => {
        window.history.back();
    }
  return (
    <a onClick={goBack} className='text-white hover:text-gray-100 hover:cursor-pointer duration-200'>go back</a>
  );
}