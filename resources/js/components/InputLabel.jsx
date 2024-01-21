import Translate from "./Translate";

export default function InputLabel({ value, className = '', children, ...props }) {
    return (
        <label {...props} className={className+` block text-sm dark:text-slate-200  ` }>
           <Translate> {value ? value : children}</Translate>
        </label>
    );
}