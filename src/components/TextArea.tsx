interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  height?: string
}

export function TextArea({ onChange, height, ...rest }: TextAreaProps) {

  return (
    <div>
      <textarea
        className={`w-[850px] h-[220px] notebook:h-[100px] px-4 py-4 bg-gray-600 text-gray-300 border border-gray-300 rounded focus-within:ring-2 ring-cyan-500 blur-none mt-1 ${height}`}
        placeholder="O que você está pensando?"
        onChange={onChange}
        {...rest}
      />
    </div>
  );
};