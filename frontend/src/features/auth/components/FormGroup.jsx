import React from 'react'

const FormGroup = ({label,placeholder,className}) => {
  return (
    <div className="form-group">
        <label htmlFor={label}>{label}</label>
          <input
            type="text"
            id={label}
            name={label}
            className={className}
            placeholder={placeholder}

            required
          />
    </div>
  )
}

export default FormGroup
