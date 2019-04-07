import PropTypes from 'prop-types';

import css from './Field.css';

/**
 * Field í formi
 */
export default function Field(props) {
  const { name, inputType, labelText, onChange, checked, defValue } = props;

  return (
    <div className={css.field}>
      <label className={css.field__label} htmlFor={css.field__input}>{labelText}</label>
      <input name={name} type={inputType} className={css.field__input} onChange={onChange} checked={checked} defaultValue={defValue}/>
    </div>
  );
}

Field.propTypes = {
  name: PropTypes.string,
  inputType: PropTypes.string,
  labelText: PropTypes.string,
  onChange: PropTypes.func,
  checked: PropTypes.bool,
  defValue: PropTypes.string,
}

Field.defaultProps = {
  name: null,
  inputType: 'text',
  labelText: null,
  onChange: null,
  checked: null,
  defValue: '',
}
