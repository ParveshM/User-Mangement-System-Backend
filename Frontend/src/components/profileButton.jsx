const Button = ({ text }) => {
  return (
    <button className="w-full py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-md hover:bg-gradient-to-bl focus:outline-none">
      {text}
    </button>
  );
};
export default Button;
