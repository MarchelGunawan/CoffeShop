interface PropTypes {
  name: string;
  id: string;
  type?: string;
  label?: string;
  onChange?: any;
}

const Input = (props: PropTypes) => {
  const { name, id, type = 'text', onChange } = props;

  return (
    <label htmlFor={id} className="p-2 mt-6 rounded-xl border-thin bg-white" >
      <input className="w-full" type={type} name={name} id={id} onChange={onChange} placeholder={type}/>
    </label>
  );
};

export default Input;
