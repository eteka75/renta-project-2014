import Translate from "./Translate";

export default function InputLabel({ value, className = '', children, ...props }) {
    return (
        <label {...props} className={`block text-sm  ` + className}>
           <Translate> {value ? value : children}</Translate>
        </label>
    );
}
