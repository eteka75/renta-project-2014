import Translate from "./Translate";

export default function InputLabel({ value, className = '', children, ...props }) {
    return (
        <label {...props} className={`block text-sm text-gray-700 dark:text-gray-300 ` + className}>
           <Translate> {value ? value : children}</Translate>
        </label>
    );
}
